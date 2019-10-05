const collectCoverage = !process.env.SKIP_COVERAGE;

/** @type {jest.InitialOptions} */
module.exports = {
  collectCoverage,
  collectCoverageFrom: [
    'lib/**/*.ts',
    'lib/**/*.tsx',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '/test/',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  roots: ['lib'],
  testEnvironment: 'node',
  // Jasmine, jest's default test-runner, fails silently on afterAll within
  // a describe block. This is a bug that the jest team is not going to fix
  // because they plan to use jest-circus/runner by default in the near future.
  // https://github.com/facebook/jest/issues/6692
  testRunner: 'jest-circus/runner',
  transform: {
    '.+\\.tsx?$': 'ts-jest',
  },
};
