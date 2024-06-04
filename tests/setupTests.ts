import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import {
  beforeAll, afterEach, afterAll, jest,
} from '@jest/globals';
import { cleanup } from '@testing-library/react';

import server from './__mocks__/server';

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
