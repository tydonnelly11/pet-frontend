import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
/// <reference types="vitest" />

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [Vue()],
   resolve: {
      alias: {
         '@': '/src',
         'baseurl':'${this.$baseURL}/'
         
      },
      test: {
         globals: true,
      },
   },
})
