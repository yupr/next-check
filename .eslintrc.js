module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    "unused-imports"
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
  }
};
