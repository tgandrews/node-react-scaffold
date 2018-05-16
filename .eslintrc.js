module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  globals: {
    sandbox: true,
  },
  extends: [
    'airbnb',
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
      {
        devDependencies: [
          '**/*.spec.js',
          'test/**.js',
          'src/config/webpack.config.*.js',
          'src/server/router/static/development.js',
        ],
      },
    ],
    'max-params': ['error', 4],
    'no-null/no-null': ['error'],
    'no-unused-expressions': ['off'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
    'prettier/prettier': 'error',
    radix: 'error',
    'react/jsx-filename-extension': 'off',
  },
};
