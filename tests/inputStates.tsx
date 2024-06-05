import { type UserEvent } from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { expect } from '@jest/globals';

const failState = async (
  user: UserEvent,
  input: HTMLElement,
  tip: HTMLElement,
  stringToType: string,
) => {
  await act(async () => {
    await user.click(input);
    await user.type(input, stringToType);
    await user.tab();
  });

  expect(input).toHaveClass('is-danger');
  expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
  expect(tip).not.toHaveClass('hidden');
};

const successState = async (
  user: UserEvent,
  input: HTMLElement,
  tip: HTMLElement,
  stringToType: string,
) => {
  await act(async () => {
    await user.click(input);
    await user.type(input, stringToType);
    await user.tab();
  });

  expect(input).toHaveClass('is-success');
  expect(input).not.toHaveClass('is-danger');
  expect(tip).toHaveClass('hidden');
};

const idleState = async (
  input: HTMLElement,
  tip: HTMLElement,
) => {
  expect(input).not.toHaveClass('is-danger');
  expect(input).not.toHaveClass('is-success');
  expect(tip).toHaveClass('hidden');
};

export { idleState, failState, successState };
