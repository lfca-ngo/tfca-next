module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'simple-import-sort',
    'sort-destructure-keys',
  ],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['info', 'error'],
      },
    ],
    'no-unused-vars': ['error'],
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: false,
      },
    ],
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: false,
        minKeys: 2,
        natural: false,
      },
    ],
    'sort-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
