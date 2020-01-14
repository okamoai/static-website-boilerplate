module.exports = {
  extends: ['airbnb/base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: { browser: true },
  rules: {
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
  },
  overrides: [
    {
      files: 'build/**/*.js',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: 'src/**/*.js',
      parser: 'babel-eslint',
    },
  ],
}
