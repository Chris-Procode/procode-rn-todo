const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const react = require('eslint-plugin-react');
const globals = require('globals');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    // This entry is for linting the config file itself
    files: ['eslint.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    plugins: {
      react,
      importPlugin,
      eslintPluginPrettierRecommended,
    },
    rules: {
      'prettier/prettier': 'error',
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'], // Built-in and external imports first
            'internal',
            ['sibling', 'parent'], // Local imports afterward
            'index',
          ],
          'newlines-between': 'always', // Add a newline between groups
          alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetize imports within groups
        },
      ],
      // React rules
      'react/jsx-uses-react': 'off', // Suppress the rule for React 17+
      'react/react-in-jsx-scope': 'off', // Suppress the rule for React 17+
      'react/jsx-uses-vars': 'warn', // Ensure variables in JSX are marked as used
      'react/no-unescaped-entities': 'off',
      //import rules
      'import/no-named-as-default': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
]);
