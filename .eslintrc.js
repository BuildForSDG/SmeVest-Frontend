module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'airbnb-base', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }]
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never'
      }
    ],
    'react/prop-types': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'no-nested-ternary': 0
  }
};
