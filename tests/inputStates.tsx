import { type UserEvent } from '@testing-library/user-event';
import { act, screen } from '@testing-library/react';
import { expect } from '@jest/globals';

interface Options {
  tip?: HTMLElement,
  ignoreClass?: boolean,
  ignoreIcon?: boolean,
}

const failState = async (
  user: UserEvent,
  input: HTMLElement,
  stringToType: string,
  options?: Options,
) => {
  await act(async () => {
    await user.click(input);
    await user.type(input, stringToType);
    await user.tab();
  });

  expect(input).toHaveClass('is-danger');
  if (options && options.ignoreIcon) {
    expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
  }
  if (options && options.tip) {
    expect(options.tip).not.toHaveClass('hidden');
  }
};

const successState = async (
  user: UserEvent,
  input: HTMLElement,
  stringToType: string,
  options?: Options,
) => {
  await act(async () => {
    await user.click(input);
    await user.type(input, stringToType);
    await user.tab();
  });

  if (!options || !options.ignoreClass) {
    expect(input).toHaveClass('is-success');
  }
  expect(input).not.toHaveClass('is-danger');
  if (options && options.tip) {
    expect(options.tip).toHaveClass('hidden');
  }
};

const idleState = async (
  user: UserEvent,
  input: HTMLElement,
  clear: boolean = false,
  options?: Options,
) => {
  if (clear) {
    await act(async () => {
      await user.clear(input);
      await user.tab();
    });
  }

  expect(input).not.toHaveClass('is-danger');
  expect(input).not.toHaveClass('is-success');
  if (options && options.tip) {
    expect(options.tip).toHaveClass('hidden');
  }
};

export { idleState, failState, successState };
