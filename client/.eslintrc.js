module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['jest', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'max-len': [1, 100, 2],
    'import/no-named-as-default': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-mixed-operators': 1,
    'no-underscore-dangle': 0,
    'import/no-unresolved': 2,
    'func-names': 0,
    // temporary since webpack-resolver not working with aliases in webpack2
    'import/no-extraneous-dependencies': 0,
    'class-methods-use-this': 0,
    'react/require-default-props': 0,
    'array-callback-return': 0,
    'react/destructuring-assignment': 0,
    'space-before-function-paren': 0,
    // prettier
    'function-paren-newline': 0,
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'object-curly-newline': 0,
    // use prettier for these
    'no-confusing-arrow': 0,
    'generator-star-spacing': 0,
    'operator-linebreak': 0,
    // next
    'react/react-in-jsx-scope': 0,
    // ts
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
  },
};
