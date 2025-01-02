import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierEslint from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: { ...globals.browser, ...globals.node } }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  prettierEslint,
  {ignores: ["/packages/create-app/templates","/packages/**/dist","dist","node_modules"]},
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          ignoreRestSiblings: true
        }
      ],
      "@typescript-eslint/no-var-requires": "error",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            ["internal"],
            ["parent", "sibling"],
            ["index"]
          ],
          alphabetize: {
            order: "asc"
          }
        }
      ],
      "import/first": "error",
      "import/exports-last": "error",
      "import/newline-after-import": "error",
      "import/default": "error",
      "import/no-useless-path-segments": "error",
      "import/no-cycle": "error"
    }
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            'packages/*/tsconfig.json',
            'packages/*/tsconfig.types.json',
            'tsconfig.json',
          ]
        }
      }
    }
  }
];
