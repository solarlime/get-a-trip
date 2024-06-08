import { describe, test, expect } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';
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

    const input = await screen.findByPlaceholderText('sigmund@freud.site');
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

    const input = await screen.findByPlaceholderText('Full name on card');

    await idleState(user, input);
    await idleState(user, input, true);
    await successState(user, input, 'Sigmund Freud');
  });

  describe.each(Object.entries(cardCases))('Card number + date', (type, cardCase) => {
    test(`${type}: number`, async () => {
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

    test(`${type}: date`, async () => {
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

  test.each([
    cardCases.jcb_wrong_date, cardCases.amex_all_ok,
  ])('CVC', async (cardCase) => {
    const user = userEvent.setup();

    render(<Card />);
    expect(await screen.findByText(/^Card information$/)).toBeInTheDocument();

    const numberInput = await screen.findByPlaceholderText('1234 1234 1234 1234');
    const cvcInput = await screen.findByPlaceholderText('CVC');
    const cvcTip = await screen.findByText('Your card\'s security code is incomplete.');

    // Fill CVC, but not card number: idle
    await act(async () => {
      await user.click(cvcInput);
      await user.type(cvcInput, cardCase.cvc);
      await user.tab();
    });
    expect(cvcInput).not.toHaveClass('is-danger');
    expect(cvcInput).not.toHaveClass('is-success');
    expect(cvcTip).toHaveClass('hidden');

    // After - fill number: cleared & idle
    await act(async () => {
      await user.click(numberInput);
      await user.type(numberInput, cardCase.number);
      await user.tab();
    });
    expect(cvcInput).not.toHaveClass('is-danger');
    expect(cvcInput).not.toHaveClass('is-success');
    expect(cvcTip).toHaveClass('hidden');
    expect(cvcInput).toHaveValue('');

    // After - fill too short CVC: fail
    await failState(user, cvcInput, cardCase.cvc.slice(0, -1), cvcTip);

    await idleState(user, cvcInput, true, cvcTip);
    await successState(user, cvcInput, cardCase.cvc, cvcTip);
  });

  test('Filled form', async () => {
    const user = userEvent.setup();

    render(<Payment />);
    expect(await screen.findByText(/^Pay with card$/)).toBeInTheDocument();

    const button = await screen.findByRole('button');
    expect(button).toBeDisabled();

    const cardCase = cardCases.amex_all_ok;

    const emailInput = await screen.findByPlaceholderText('sigmund@freud.site');
    const numberInput = await screen.findByPlaceholderText('1234 1234 1234 1234');
    const dateInput = await screen.findByPlaceholderText('MM / YY');
    const cvcInput = await screen.findByPlaceholderText('CVC');
    const cardholderNameInput = await screen.findByPlaceholderText('Full name on card');

    await successState(user, emailInput, 'sigmund@freud.site');
    await successState(user, numberInput, cardCase.number);
    await successState(user, dateInput, cardCase.date);
    await successState(user, cvcInput, cardCase.cvc);
    await successState(user, cardholderNameInput, 'Sigmund Freud');

    expect(button).not.toHaveClass('disabled');
  });
});
