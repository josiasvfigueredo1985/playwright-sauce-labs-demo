const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const playwright = require('eslint-plugin-playwright')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/'] },
  ...compat.extends('google', 'prettier'),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: __dirname,
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
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'max-len': ['error', { code: 120 }],
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Assertions live in our DSL components, not in raw expect calls.
      'playwright/expect-expect': 'off',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/prefer-web-first-assertions': 'error',
    },
  },
  {
    files: ['src/business/components/**/*.ts', 'src/business/pages/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            ':matches(NewExpression, CallExpression) > Literal:matches([regex], [value=/./])',
          message:
            'No magic strings: use a constant from src/business/resources (LoginFormOptions, TestIds, ...).',
        },
        {
          // A page's own path is not reused, so it stays on the page.
          selector: "PropertyDefinition[key.name!='path'] > Literal",
          message:
            'No magic strings: use a constant from src/business/resources (LoginFormOptions, TestIds, ...).',
        },
        {
          selector: ':matches(NewExpression, CallExpression) > TemplateLiteral',
          message:
            'No magic strings: use a constant from src/business/resources (LoginFormOptions, TestIds, ...).',
        },
      ],
    },
  },
  {
    rules: {
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },
]
