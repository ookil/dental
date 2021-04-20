const path = require('path');

module.exports = {
  preset: 'ts-jest',
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/__tests_/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.ts'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/__tests__/**/*.test.js'],
    },
  ],
  //testEnvironment: path.join(__dirname, 'prisma', 'prisma-test-environment.js'),
  /* testEnvironment: "node", */
};
