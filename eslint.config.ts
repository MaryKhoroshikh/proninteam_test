import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    settings: {
      react: {
        version: '19.2.0',
      },
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    ignores: ['node_modules/**', 'dist/**', '**.spec.ts', '**.test.ts'],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  globalIgnores([
		"!node_modules/", // unignore `node_modules/` directory
		"node_modules/*", // ignore its content
		"!node_modules/mylibrary/", // unignore `node_modules/mylibrary` directory
    "dist/**/*", // ignore all contents in and under `build/` directory but not the `build/` directory itself

	]),
]);