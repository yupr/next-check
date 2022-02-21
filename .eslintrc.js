module.exports = {
  root: true,
  parserOptions: {
    // extends で指定している
    // plugin:@typescript-eslint/recommended-requiring-type-checking
    // に対して型情報を提供するため tsconfig.json の場所を指定。
    project: './tsconfig.json',
  },
  plugins: ['unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};
