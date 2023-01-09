module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  plugins: [
    'import'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'import/no-unused-modules': [1, { unusedExports: true }]
  }
}
