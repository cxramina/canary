import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import path, { resolve } from 'path'
import svgr from 'vite-plugin-svgr' // Ensure you have this plugin installed

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json',
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('src/', ''),
        content
      })
    }),
    svgr()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'canary',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
