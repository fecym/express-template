module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
    es6: true
  },
  globals: {},
  rules: {},
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: "latest"
  },
};