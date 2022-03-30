module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',
  }
};
