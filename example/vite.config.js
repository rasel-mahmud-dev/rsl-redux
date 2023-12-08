import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "rsl-redux": "rsl-redux/src",
      "rsl": "example/src",
      "@": "./src",
      "src": "./src"
    }
  }
})
