import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          $color-background: #FAFAFC;
          $color-borders-light: #E6EAF2;
          $color-borders-main: rgba(81, 93, 116, 0.50);
          $color-elevate: #10C300;
          $color-highlight: #F30168 ;
          $color-text-inverted: #fff;
          $color-light-grey: #D9D9D9;          $color-text-inverted: #fff;
          $color-text-secondary: #666;
          $color-text-hidden: #515d74;
          $color-text: #292D32;
          $font-family: 'Sora', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          $font-size-mainTitle: 28px;
          $font-size-secondaryTitle: 26px;
          $font-size-subtitle: 18px;
          $font-size-default: 17px;
          $font-size-sm: 16px;
          $font-size-xsm: 14px;
        `
      }
    }
  }
})
