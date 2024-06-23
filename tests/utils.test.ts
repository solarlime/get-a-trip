import { describe, test, expect } from '@jest/globals';

import { nbspify } from '../src/utils/utils';

const sameCase = 'I cannot see any men';
const testCases = [['I see a man', 'I see a\u00A0man'], [sameCase, sameCase]];

describe.each(testCases)('Testing nbspify', (input, output) => {
  test(`input: ${input}`, () => {
    const result = nbspify(input);
    expect(result).toEqual(output);
  });
});
