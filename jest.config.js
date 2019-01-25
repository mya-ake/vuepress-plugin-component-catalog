module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [],
      },
    },
  },
};
