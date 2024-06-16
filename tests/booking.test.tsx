import {
  describe, test, expect,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Booking from '../src/components/Page/Main/Directions/Direction/Booking/Booking';

describe('Booking', () => {
  test('Idle booking state', async () => {
    render(<Booking />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Start your adventure now!$/)).toBeInTheDocument();

    const button = await screen.findByText('Checkout');
    expect(button).toHaveClass('disabled');
  });
});
