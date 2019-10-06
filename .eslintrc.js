module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  globals: {
    // TODO: Should the following setting be moved to a .eslintrc file in the lib/ folder?
    //       Because: We don't want NodeJS types used in the React client side code.
    NodeJS: 'readonly',
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['jest', 'react-hooks'],
  rules: {},
};
