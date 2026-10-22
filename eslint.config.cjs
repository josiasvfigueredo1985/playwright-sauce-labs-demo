const {FlatCompat} = require('@eslint/eslintrc');
const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {ignores: ['node_modules/', 'playwright-report/', 'test-results/']},
  ...compat.extends('google'),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'require-jsdoc': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    rules: {
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },
];
