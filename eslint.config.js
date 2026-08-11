import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
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
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Sin esta regla, ESLint no ve que <motion.div> usa la variable `motion` y
      // la reporta como no usada. Eran 5 falsos positivos: borrar esos imports
      // rompía el sitio.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
    },
  },
  {
    // api/ corre en Node dentro de Vercel, no en el navegador: sin esto,
    // `process.env` se reporta como variable inexistente.
    files: ['api/**/*.js'],
    languageOptions: { globals: globals.node },
  },
])
