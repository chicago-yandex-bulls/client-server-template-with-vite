const MULTI_LINE = 'always-multiline';
const ONLY_MULTILINE = 'only-multiline';

const IGNORE_FILES = [
  'packages/client/public/**',
  'packages/client/dist/**',
  'packages/client/dist-ssr/**',
  'packages/server/dist/**',
];

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'sonarjs'],
  ignorePatterns: IGNORE_FILES,
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    'comma-dangle': [
      'error',
      {
        arrays: MULTI_LINE,
        objects: MULTI_LINE,
        imports: MULTI_LINE,
        exports: MULTI_LINE,
        functions: ONLY_MULTILINE,
      },
    ],
    'eol-last': ['error', 'always'],
    'import/default': 2,
    'import/export': 2,
    'import/named': 2,
    'import/namespace': [
      2,
      {
        allowComputed: false,
      },
    ],
    'import/no-restricted-paths': 2,
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'internal', 'index', 'sibling', 'parent', 'builtin', 'object'],
        'newlines-between': 'always',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-trailing-spaces': ['error'],
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block',
      },
      {
        blankLine: 'always',
        prev: 'block',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['packages/client/src/services/sw/sw.worker.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 0,
      },
    },
  ],
};
