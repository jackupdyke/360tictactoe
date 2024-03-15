module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:etc/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'unicorn', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx', '.js'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'import/prefer-default-export': 'warn',
    'comma-dangle': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^react$'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/stories/**/*.stories.tsx'],
      },
    ],
    'no-multiple-empty-lines': 'error',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'pascalCase',
      },
    ],
    'no-tabs': 'off',
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
    'jsx-quotes': ['error', 'prefer-single'],
    'prefer-arrow-callback': 'error',
    indent: 'off',
    'unicorn/switch-case-braces': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/alt-text': 'warn',
    radix: 'off',
    'unicorn/prefer-number-properties': 'off',
    'sort-keys': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: '18',
    },
  },
};
