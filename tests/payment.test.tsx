import { describe, test, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Payment from '../src/components/Checkout/Payment/Payment';

describe('Payment component', () => {
  test('Idle state', async () => {
    render(<Payment />);
    expect(await screen.findByText(/^Pay with card$/)).toBeInTheDocument();

    const button = await screen.findByRole('button');
    expect(button).toBeDisabled();
  });
});
