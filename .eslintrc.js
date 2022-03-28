module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // これ入れたらライブラリの型まで文句言われてしまって詰んだのでとりあえずオフ
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',
    // "@typescript-eslint/no-unsafe-assignment": "off",
    // "@typescript-eslint/no-unsafe-call": "off",
    // "@typescript-eslint/no-unsafe-member-access": "off"
  },
};
