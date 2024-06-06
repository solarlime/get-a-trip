import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { failState, idleState, successState } from './inputStates';
import cardCases from './cardInformation';
import Payment from '../src/components/Checkout/Payment/Payment';
import Email from '../src/components/common/Email';
import Name from '../src/components/common/Name';
import Card from '../src/components/Checkout/Payment/Card/Card';

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
    test(`${cardCase.type}: number`, async () => {
      const user = userEvent.setup();

      render(<Card />);
      expect(await screen.findByText(/^Card information$/)).toBeInTheDocument();

      const numberInput = await screen.findByPlaceholderText('1234 1234 1234 1234');
      const numberTip = await screen.findByText('Your card number is invalid.');

      await idleState(user, numberInput);

      if (cardCase.isValidNumber) {
        await successState(user, numberInput, cardCase.number, numberTip);
      } else {
        await failState(user, numberInput, cardCase.number, numberTip);
        await idleState(user, numberInput, true);
      }
    });

    test(`${cardCase.type}: date`, async () => {
      const user = userEvent.setup();

      render(<Card />);
      expect(await screen.findByText(/^Card information$/)).toBeInTheDocument();

      const dateInput = await screen.findByPlaceholderText('MM / YY');
      const dateTip = await screen.findByText('Your card\'s expiration date is invalid.');

      await idleState(user, dateInput);

      if (cardCase.isValidDate) {
        await successState(user, dateInput, cardCase.date, dateTip);
      } else {
        await failState(user, dateInput, cardCase.date, dateTip);
        await idleState(user, dateInput, true);
      }
    });
  });
});
