import {
  describe, test, expect,
} from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Booking from '../src/components/Page/Main/Directions/Direction/Booking/Booking';
import { successState } from './inputStates';

describe('Booking', () => {
  test('Idle booking state', async () => {
    render(<Booking />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Start your adventure now!$/)).toBeInTheDocument();

    const button = await screen.findByText('Checkout');
    expect(button).toHaveClass('disabled');
  });

  test('Checkout changes', async () => {
    const user = userEvent.setup();

    render(<Booking />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Start your adventure now!$/)).toBeInTheDocument();

    const total = await screen.findByTestId('Total_value');
    const checkoutBox = await screen.findByTestId('checkout_box');
    expect(total).toHaveTextContent('0$');
    expect(checkoutBox).not.toHaveTextContent('room');
    expect(checkoutBox).not.toHaveTextContent('SIM card');
    expect(checkoutBox).not.toHaveTextContent('insurance');

    const simInput = await screen.findByTestId('SIM_card');
    await act(async () => {
      await user.selectOptions(simInput, 'Local SIM card');
    });
    expect((screen.getByRole('option', { name: /Local SIM card/ }) as HTMLOptionElement).selected).toBe(true);
    expect(checkoutBox).toHaveTextContent('SIM card');

    const roomInput = await screen.findByTestId('room');
    await act(async () => {
      await user.selectOptions(roomInput, 'Shared room');
    });
    expect((screen.getByRole('option', { name: /Shared room/ }) as HTMLOptionElement).selected).toBe(true);

    const insuranceInput = await screen.findByTestId('travel_insurance');
    await act(async () => {
      await user.selectOptions(insuranceInput, 'Without insurance');
    });
    expect((screen.getByRole('option', { name: /Without insurance/ }) as HTMLOptionElement).selected).toBe(true);
    expect(checkoutBox).not.toHaveTextContent('room');
    expect(checkoutBox).not.toHaveTextContent('insurance');

    const durationInput = await screen.findByPlaceholderText('Number of nights');
    await successState(user, durationInput, '1', { ignoreClass: true });
    expect(checkoutBox).toHaveTextContent('room');
    expect(checkoutBox).toHaveTextContent('insurance');
    expect(checkoutBox).toHaveTextContent('Basic program');
    expect(total.textContent).not.toHaveLength(2);

    const button = await screen.findByText('Checkout');
    expect(button).toHaveClass('disabled');
  });
});
