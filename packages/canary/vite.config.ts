import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { uniq } from 'lodash-es'
import path, { resolve } from 'path'
import svgr from 'vite-plugin-svgr'
const pkg = require('./package.json')

// All deps are external except radix-ui
const external = uniq(
  Object.keys(pkg.dependencies || [])
    .concat(Object.keys(pkg.devDependencies || []))
    .concat(Object.keys(pkg.peerDependencies || []))
).filter((pkgName: string) => !pkgName.startsWith('@radix-ui'))

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
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
      external: external
    }
  }
})
