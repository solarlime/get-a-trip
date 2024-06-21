import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import {
  beforeAll, afterEach, afterAll, jest,
} from '@jest/globals';
import { cleanup } from '@testing-library/react';
import { type ReactElement } from 'react';

import server from './__mocks__/server';

jest.mock('../src/components/Page/Main/Search/useButtonSize', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport: jest.fn(),
}));

jest.mock('../src/components/Page/common/Hoster', () => ({
  __esModule: true,
  default: jest.fn(),
  namedExport: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const original = jest.requireActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    __esModule: true,
    ...original,
    ScrollRestoration: (): ReactElement => (<div />),
    useParams: jest.fn(),
  };
});

jest.mock('../src/utils.ts', () => {
  const original = jest.requireActual<typeof import('../src/utils')>('../src/utils');
  return {
    __esModule: true,
    ...original,
    cacheImages: () => Promise.resolve(),
  };
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  server.resetHandlers();
});

afterAll(async () => {
  server.close();
});
