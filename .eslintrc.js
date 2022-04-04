module.exports = {
  root: true,

  //globalオブジェクトを宣言なしで参照可能にするのか知らせるための設定
  env: {
    browser: true, //window, alertなどbrowserで動くグローバル変数をglobals設定に登録
    es2021: true,
  },

  // 複数のルールをまとめたconfiguration名を適用
  // ここで指定可能なものは、sharable configuration オブジェクトと呼ぶ
  // sharable configuration のみを提供している パッケージには、`eslint-config-` というプレフィックスが付与されている
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next', //create-next-appで標準に搭載されたルールセット
    'next/core-web-vitals', //create-next-appで標準に搭載されたより厳格なルールセット
    'prettier',
  ],

  // 使用するプラグインを使用。
  // ルールを有効化するためにextendsで指定する必要がある
  // plugins: {
  //}.

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },

  // extendsによる共有設定で大まかなルール設定を入れ、個別にルールを記載
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
