/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    '@vue/eslint-config-typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always']
  }
};
