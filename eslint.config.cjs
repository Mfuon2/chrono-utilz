const tseslint = require('typescript-eslint');
const globals = require('globals');
module.exports = tseslint.config(...tseslint.configs.recommended, {
  files: ['src/**/*.ts'],
  languageOptions: {globals: globals.node},
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
});
