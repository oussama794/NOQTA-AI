import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/huggingface': {
          target: 'https://router.huggingface.co',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/huggingface/, '/hf-inference'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const apiKey = process.env.VITE_HUGGINGFACE_API_KEY;
              if (apiKey) {
                proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
              }
            })
          },
        },
      },
    },
  }
})
