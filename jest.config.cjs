module.exports = {
  rootDir: __dirname,
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    /**
     * @note Opt-out from JSDOM using browser-style resolution
     * for dependencies. This is simply incorrect, as JSDOM is
     * not a browser, and loading browser-oriented bundles in
     * Node.js will break things.
     *
     * Consider migrating to a more modern test runner if you
     * don't want to deal with this.
     */
    customExportConditions: [''],
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel-jest.config.cjs' }],
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!uuid)',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    'results.json': '<rootDir>/tests/__mocks__/mockResults.ts',
    '\\.svg$': '<rootDir>/tests/__mocks__/svg.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.tsx'],
};
