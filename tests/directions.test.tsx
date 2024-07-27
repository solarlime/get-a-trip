import { describe, test, expect } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent, { type UserEvent } from '@testing-library/user-event';

import { failState, idleState, successState } from './inputStates';
import Search from '../src/components/Page/Main/Search/Search';
import CheckInDate from '../src/components/Page/Main/Search/CheckInDate';
import Directions from '../src/components/Page/Main/Directions/Directions';
import { futureMonthString, beforeFutureMonthString, futureMonth } from './__mocks__/mockResults';

const dates = () => {
  const date = new Date();
  return {
    farFuture: { date: `${date.getFullYear() + 10}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: false },
    future: { date: `${date.getFullYear() + 1}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: true },
    past: { date: `${date.getFullYear() - 1}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: false },
  };
};

const searchCases = (): Array<{ date: string, continent: 'Europe' | 'Asia', filterResult: 'precise' | 'soft' | 'none' }> => {
  const date = new Date();
  const year = (futureMonth <= date.getMonth() + 1) ? date.getFullYear() + 1 : date.getFullYear();
  return [
    { date: `${year}-${futureMonthString}-10`, continent: 'Asia', filterResult: 'precise' },
    { date: `${year}-${futureMonthString}-10`, continent: 'Europe', filterResult: 'soft' },
    { date: `${year}-${beforeFutureMonthString}-09`, continent: 'Asia', filterResult: 'none' },
  ];
};

const fillSearch = async (user: UserEvent, button: HTMLElement, date: string, continent: 'Europe' | 'Asia') => {
  expect(button).toHaveClass('disabled');

  const destinationInput = await screen.findByTestId('where_to_go');
  const checkInInput = await screen.findByPlaceholderText('Add dates');
  const durationInput = await screen.findByPlaceholderText('Number of nights');
  const peopleInput = await screen.findByPlaceholderText('How many will go?');

  await act(async () => {
    await user.selectOptions(destinationInput, continent);
  });
  expect((screen.getByRole('option', { name: continent }) as HTMLOptionElement).selected).toBe(true);

  await successState(user, checkInInput, date, { ignoreClass: true });
  await successState(user, durationInput, '1', { ignoreClass: true });
  await successState(user, peopleInput, '1', { ignoreClass: true });

  expect(button).not.toHaveClass('disabled');
};

describe('Directions component', () => {
  test('Idle search state', async () => {
    render(<Search title="Find your perfect tour" />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Find your perfect tour$/)).toBeInTheDocument();

    const button = await screen.findByRole('link');
    expect(button).toHaveClass('disabled');
  });

  test.each(Object.values(dates()))('Check-in date', async (dateCase) => {
    const user = userEvent.setup();

    render(<CheckInDate />);
    expect(await screen.findByText(/^Check in$/)).toBeInTheDocument();

    const checkInInput = await screen.findByPlaceholderText('Add dates');

    await idleState(user, checkInInput);

    if (dateCase.isValid) {
      await successState(user, checkInInput, dateCase.date, { ignoreClass: true });
    } else {
      await failState(user, checkInInput, dateCase.date);
    }
  });

  test('Filled form', async () => {
    const user = userEvent.setup();

    render(<Search title="Find your perfect tour" />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Find your perfect tour$/)).toBeInTheDocument();

    const button = await screen.findByRole('link');
    await fillSearch(user, button, dates().future.date, 'Asia');
  });

  test.each(searchCases())('Searching', async (searchCase) => {
    const user = userEvent.setup();

    render(<Directions />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Your results will be there$/)).toBeInTheDocument();

    const button = await screen.findByRole('link');
    await fillSearch(user, button, searchCase.date, searchCase.continent);

    await user.click(button);
    if (searchCase.filterResult === 'precise') {
      expect(await screen.findByText(/^Something fits your preferences!$/)).toBeInTheDocument();
      expect(screen.queryByTestId('test-direction')).toBeInTheDocument();
    }
    if (searchCase.filterResult === 'soft') {
      expect(await screen.findByText(/^Nothing fits your preferences, but these variants are close to it$/)).toBeInTheDocument();
      expect(screen.queryByTestId('test-direction')).toBeInTheDocument();
    }
    if (searchCase.filterResult === 'none') {
      expect(await screen.findByText(/^Nothing fits your preferences$/)).toBeInTheDocument();
      expect(screen.queryByTestId('test-direction')).not.toBeInTheDocument();
    }
  });
});
