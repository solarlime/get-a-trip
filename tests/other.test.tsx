import {
  describe, test, expect, jest,
} from '@jest/globals';
import {
  act, findAllByRole, findByRole, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import * as reactRouterDom from 'react-router-dom';
import { BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { type ReactElement } from 'react';

import Direction from '../src/components/Page/Main/Directions/Direction/Direction';
import { routes } from '../src/App';
import { fillInBookingForm } from './booking.test';
import { futureMonth, futureMonthLetterString } from './__mocks__/mockResults';

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

const date = new Date();
const year = (futureMonth <= date.getMonth() + 1) ? date.getFullYear() + 1 : date.getFullYear();

test('Testing carousel', async () => {
  const location = `testia-testenburg-${year}-${futureMonthLetterString}-1`;
  jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ location });
  const { user } = renderWithRouter(<Direction />, { route: `/directions/${location}` });
  expect(await screen.findByText(/^About tour$/)).toBeInTheDocument();

  const carousel = await screen.findAllByTestId('carousel').then((carousels) => carousels[0]);
  expect(carousel).toBeInTheDocument();

  const img = await findByRole(carousel, 'img');
  expect(img).toBeInTheDocument();

  const buttons = await findAllByRole(carousel, 'button');

  await user.click(buttons[0]);
  expect(img).toHaveClass('disappear');
  fireEvent(img, new Event('load'));
  await waitFor(() => {
    expect(img).not.toHaveClass('disappear');
  });

  await act(async () => {
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    await user.click(buttons[1]);
  });
  expect(img).toHaveClass('disappear');
  fireEvent(img, new Event('load'));
  await waitFor(() => {
    expect(img).not.toHaveClass('disappear');
  });
});

describe('Routing', () => {
  test('Redirect to /directions', async () => {
    const location = 'test';
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ location });
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [`/directions/${location}`] })} />);
    expect(await screen.findByText(/Find/)).toBeInTheDocument();
  });

  test('Not found', async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/direction'] })} />);
    expect(await screen.findByText(/No way/)).toBeInTheDocument();
  });

  test('Checkout', async () => {
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/checkout'] })} />);
    expect(await screen.findByText(/Pay with card/)).toBeInTheDocument();

    const backButton = await screen.findByTestId('back_button');
    const user = userEvent.setup();
    await act(async () => {
      await user.click(backButton);
    });
    expect(await screen.findByText(/From a small trip/)).toBeInTheDocument();
  });

  test('Card -> Direction', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: ['/'] })} />);
    expect(await screen.findByText(/From a small trip/)).toBeInTheDocument();

    const links = await screen.findAllByTestId('test-direction');
    await act(async () => {
      await user.click(links[0]);
    });
    expect(await screen.findByText(/Testia, Testenburg/)).toBeInTheDocument();
  });

  test('Direction -> Checkout', async () => {
    const user = userEvent.setup();
    const location = `testia-testenburg-${year}-${futureMonthLetterString}-1`;
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ location });

    render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [`/directions/${location}`] })} />);
    expect(await screen.findByText(/Testia, Testenburg/)).toBeInTheDocument();

    const button = await screen.findByText('Checkout');
    expect(button).toHaveClass('disabled');

    const totalValue = await screen.findByTestId('Total_value');
    await fillInBookingForm(user, totalValue);
    expect(button).not.toHaveClass('disabled');

    await act(async () => {
      await user.click(button);
    });
    expect(await screen.findByText(/Pay with card/)).toBeInTheDocument();

    const checkoutValue = await screen.findByTestId('Checkout_value');
    expect(checkoutValue.textContent).toEqual(totalValue.textContent);
    expect(await screen.findByPlaceholderText('sigmund@freud.site')).toHaveValue();

    const backButton = await screen.findByTestId('back_button');
    await act(async () => {
      await user.click(backButton);
    });
    expect(await screen.findByText(/Testia, Testenburg/)).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('sigmund@freud.site')).not.toHaveValue();
  });
});
