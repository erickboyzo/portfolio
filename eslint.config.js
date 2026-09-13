import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/coverage/**', '**/.wrangler/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  prettierRecommended,
  {
    name: 'app/custom-rules',
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-param-reassign': 'off',
      'object-curly-newline': 'off',
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  }
);
