module.exports = {
  globalSetup: '<rootDir>/test/jest.setup.js',
  preset: 'ts-jest',
  testMatch: ['<rootDir>/__tests__/**/*.ts'],
  collectCoverage: false,
  errorOnDeprecated: true,
  testEnvironment: 'node',
};
