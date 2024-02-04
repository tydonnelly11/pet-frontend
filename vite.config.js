import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [Vue()],
   resolve: {
      alias: {
         '@': '/src',
         'baseurl':'http://localhost:80/'
         
      },
      test: {
         globals: true,
      },
   },
})
