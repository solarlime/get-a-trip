import {
  describe, test, expect, jest,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { failState, idleState, successState } from './inputStates';
import Search from '../src/components/Page/Main/Search/Search';
import CheckInDate from '../src/components/Page/Main/Search/CheckInDate';

jest.mock('../src/components/Page/Main/Search/useButtonSize', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport: jest.fn(),
}));

const dates = () => {
  const date = new Date();
  return {
    farFuture: { date: `${date.getFullYear() + 10}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: false },
    future: { date: `${date.getFullYear() + 1}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: true },
    past: { date: `${date.getFullYear() - 1}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`, isValid: false },
  };
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
});
