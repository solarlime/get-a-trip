import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { failState, idleState, successState } from './inputStates';
import Payment from '../src/components/Checkout/Payment/Payment';
import Email from '../src/components/common/Email';
import Name from '../src/components/common/Name';
import Card from '../src/components/Checkout/Payment/Card/Card';

const cardCases = [
  { type: 'Invalid MC', value: '5491073231179293', isValid: false },
  { type: 'Mastercard', value: '5491073231179294', isValid: true },
  { type: 'Visa', value: '4088183012699253', isValid: true },
  { type: 'JCB', value: '3529694058980430', isValid: true },
  { type: 'Amex', value: '375520898980093', isValid: true },
];

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

    await idleState(user, input, false, tip);
    await failState(user, input, 'sigmund', tip);
    await idleState(user, input, true, tip);
    await successState(user, input, 'sigmund@freud.site', tip);
  });

  test('Cardholder name', async () => {
    const user = userEvent.setup();

    render(<Name type="cardholder_name" />);
    expect(await screen.findByText(/^Cardholder name$/)).toBeInTheDocument();

    const input = await screen.findByRole('textbox');

    await idleState(user, input);
    await idleState(user, input, true);
    await successState(user, input, 'Sigmund Freud');
  });

  describe.each(cardCases)('Card information', (cardCase) => {
    test(`${cardCase.type} number`, async () => {
      const user = userEvent.setup();

      render(<Card />);
      expect(await screen.findByText(/^Card information$/)).toBeInTheDocument();

      const numberInput = await screen.findByPlaceholderText('1234 1234 1234 1234');
      const numberTip = await screen.findByText('Your card number is invalid.');

      await idleState(user, numberInput);

      if (cardCase.isValid) {
        await successState(user, numberInput, cardCase.value, numberTip);
      } else {
        await failState(user, numberInput, cardCase.value, numberTip);
      }
    });
  });
});
