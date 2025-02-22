import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('eslint:recommended', 'prettier'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        console: true,
        __VERSION__: true,
        __USE_SUBTITLES__: true,
        __USE_ALT_AUDIO__: true,
        __USE_EME_DRM__: true,
        __USE_CMCD__: true,
        __USE_CONTENT_STEERING__: true,
        __USE_VARIABLE_SUBSTITUTION__: true,
        __USE_M2TS_ADVANCED_CODECS__: true,
        __USE_MEDIA_CAPABILITIES__: true,
        __USE_INTERSTITALS__: true,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'no-restricted-globals': [
        2,
        {
          name: 'window',
          message:
            'Use `self` instead of `window` to access the global context everywhere (including workers).',
        },
        {
          name: 'SourceBuffer',
          message: 'Use `self.SourceBuffer`',
        },
        {
          name: 'setTimeout',
          message: 'Use `self.setTimeout`',
        },
        {
          name: 'setInterval',
          message: 'Use `self.setInterval`',
        },
      ],

      'no-restricted-properties': [
        2,
        {
          property: 'findIndex',
        },
        {
          property: 'find',
        },
      ],

      'import/first': 1,
      'no-var': 1,
      'no-empty': 1,
      'no-unused-vars': 'warn',

      'no-console': [
        1,
        {
          allow: ['assert'],
        },
      ],

      'no-fallthrough': 1,
      'no-case-declarations': 2,
      'no-self-assign': 1,
      'new-cap': 1,
      'no-undefined': 0,
      'no-global-assign': 2,
      'prefer-const': 2,
      'dot-notation': 2,
      'no-void': 2,
      'no-useless-catch': 2,
      'no-prototype-builtins': 0,
    },
  },
  {
    files: ['**/*.ts'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      'no-unused-vars': 0,
      'no-undef': 0,
      'no-use-before-define': 'off',

      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },

          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'index'],
            'parent',
            'type',
          ],
          'newlines-between': 'never',
        },
      ],

      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
        },
      ],

      '@typescript-eslint/prefer-optional-chain': 2,

      '@typescript-eslint/consistent-type-assertions': [
        2,
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-restricted-imports': 'error',
    },
  },
];
