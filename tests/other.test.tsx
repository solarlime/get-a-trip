import { test, expect, jest } from '@jest/globals';
import {
  act, findAllByRole, findByRole, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { type ReactElement } from 'react';
import Direction from '../src/components/Page/Main/Directions/Direction/Direction';

jest.mock('../src/components/Page/common/Hoster', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const original = jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    __esModule: true,
    ...original,
    useParams: () => ({ location: `testia-testenburg-${new Date().getFullYear()}-Aug-1` }),
  };
});

jest.mock('../src/utils.ts', () => {
  const original = jest.requireActual<typeof import('../src/utils.ts')>('../src/utils.ts');
  return {
    __esModule: true,
    ...original,
    cacheImages: () => Promise.resolve(),
  };
});

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

test('Testing carousel', async () => {
  const { user } = renderWithRouter(<Direction />, { route: `/directions/testia-testenburg-${new Date().getFullYear()}-Aug-1` });
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
