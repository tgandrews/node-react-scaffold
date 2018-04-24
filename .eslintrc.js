module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  globals: {
    sandbox: true,
  },
  extends: [
    'eslint-config-airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['no-null', 'prettier', 'import', 'chai-friendly'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'callback-return': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.spec.js', 'test/**.js'] },
    ],
    'max-params': ['error', 4],
    'no-null/no-null': ['error'],
    'no-unused-expressions': ['off'],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_$', varsIgnorePattern: '^React$' },
    ],
    'prettier/prettier': 'error',
    radix: ['error'],
  },
};
