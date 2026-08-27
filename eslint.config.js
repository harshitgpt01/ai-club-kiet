import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Everything under api/ is a Vercel Serverless Function, so it runs on Node
    // and reads process.env rather than import.meta.env. Without this the browser
    // globals above are the only ones in scope and `process` reads as undefined.
    files: ['api/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
