module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
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
    ]
  }
};
