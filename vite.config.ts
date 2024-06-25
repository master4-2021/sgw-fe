import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target:
          "http://sgw-alb-641860864.ap-southeast-1.elb.amazonaws.com/graphql",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, ""),
      },
    },
  },
});
