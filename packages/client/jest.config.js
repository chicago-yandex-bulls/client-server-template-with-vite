export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/mocks/fileMock.js',
  },
};
