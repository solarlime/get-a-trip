import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { failState, idleState, successState } from './inputStates';
import Payment from '../src/components/Checkout/Payment/Payment';
import Email from '../src/components/common/Email';
import Name from '../src/components/common/Name';

describe('Payment component', () => {
  test('Idle state', async () => {
    render(<Payment />);
    expect(await screen.findByText(/^Pay with card$/)).toBeInTheDocument();

    const button = await screen.findByRole('button');
    expect(button).toBeDisabled();
  });

  test('Email', async () => {
    const user = userEvent.setup();

    render(<Email />);
    expect(await screen.findByText(/^Email$/)).toBeInTheDocument();

    const input = await screen.findByRole('textbox');
    const tip = await screen.findByText('Your email is incomplete.');

    await idleState(input, tip);
    await failState(user, input, 'sigmund', tip);
    await successState(user, input, 'sigmund@freud.site', tip);
  });

  test('Cardholder name', async () => {
    const user = userEvent.setup();

    render(<Name type="cardholder_name" />);
    expect(await screen.findByText(/^Cardholder name$/)).toBeInTheDocument();

    const input = await screen.findByRole('textbox');

    await idleState(input);
    await successState(user, input, 'Sigmund Freud');
  });
});
