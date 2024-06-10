import {
  describe, test, expect, jest,
} from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Search from '../src/components/Page/Main/Search/Search';

jest.mock('../src/components/Page/Main/Search/useButtonSize', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport: jest.fn(),
}));

describe('Search component', () => {
  test('Idle state', async () => {
    render(<Search title="Find your perfect tour" />, { wrapper: BrowserRouter });
    expect(await screen.findByText(/^Find your perfect tour$/)).toBeInTheDocument();

    const button = await screen.findByRole('link');
    expect(button).toHaveClass('disabled');
  });
});
