import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import apiDev from './plugins/api-dev.ts'
import assistantKnowledge from './plugins/assistant-knowledge.ts'
import theme from './plugins/theme.ts'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [theme(), react(), tailwindcss(), apiDev(), assistantKnowledge()],
  build: {
    // Client manifest lets scripts/prerender.ts add modulepreload hints per page
    manifest: !isSsrBuild,
  },
}))
