// jest.config.cjs
/** @type {import('jest').Config} */

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/?(*.)+(test|spec).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: { '^.+\\.(ts|tsx)$': ['@swc/jest'] },
};
