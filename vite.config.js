import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pxtovw from 'postcss-px-to-viewport'

const loder_pxtovw = pxtovw({
  viewportWidth: 375,
  viewportUnit: 'vw'
})

const proxyConfig = {
  '/api': {
    target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
  }
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      }
    },
    css: {
      postcss: {
        plugins: [loder_pxtovw]
      }
    },
    server: {
      proxy: mode === 'development' ? proxyConfig : null
    }
  }
});
