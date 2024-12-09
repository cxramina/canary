// vite.config.ts
import { resolve } from "path";
import yaml from "file:///Users/joetaylor/GitHub/canary10/node_modules/.pnpm/@rollup+plugin-yaml@4.1.2_rollup@4.28.0/node_modules/@rollup/plugin-yaml/dist/es/index.js";
import react from "file:///Users/joetaylor/GitHub/canary10/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_@swc+helpers@0.5.2_vite@5.4.11_@types+node@22.9.1_sass@1.77.8_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///Users/joetaylor/GitHub/canary10/node_modules/.pnpm/vite@5.4.11_@types+node@22.9.1_sass@1.77.8_terser@5.31.3/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/joetaylor/GitHub/canary10/node_modules/.pnpm/vite-plugin-dts@4.3.0_@types+node@22.9.1_rollup@4.28.0_typescript@5.5.3_vite@5.4.11_@types+no_opxptysy2idi3vflj4bjqbec74/node_modules/vite-plugin-dts/dist/index.mjs";
import monacoEditorPlugin from "file:///Users/joetaylor/GitHub/canary10/node_modules/.pnpm/vite-plugin-monaco-editor@1.1.0_monaco-editor@0.50.0/node_modules/vite-plugin-monaco-editor/dist/index.js";
var __vite_injected_original_dirname = "/Users/joetaylor/GitHub/canary10/packages/views";
var external = [
  "react",
  "react-dom",
  "lodash-es",
  "moment",
  "@harnessio/canary",
  "@harnessio/forms",
  "@harnessio/unified-pipeline",
  "react-router-dom"
];
var vite_config_default = defineConfig({
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [
    react(),
    yaml({}),
    dts({
      outDir: "dist",
      tsconfigPath: "./tsconfig.json",
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("src/", ""),
        content
      })
    }),
    monacoEditorPlugin.default({ customWorkers: [{ entry: "monaco-yaml/yaml.worker", label: "yaml" }] })
  ],
  build: {
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "views",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: { external }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9ldGF5bG9yL0dpdEh1Yi9jYW5hcnkxMC9wYWNrYWdlcy92aWV3c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2pvZXRheWxvci9HaXRIdWIvY2FuYXJ5MTAvcGFja2FnZXMvdmlld3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2pvZXRheWxvci9HaXRIdWIvY2FuYXJ5MTAvcGFja2FnZXMvdmlld3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuaW1wb3J0IHlhbWwgZnJvbSAnQHJvbGx1cC9wbHVnaW4teWFtbCdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgbW9uYWNvRWRpdG9yUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLW1vbmFjby1lZGl0b3InXG5cbmNvbnN0IGV4dGVybmFsID0gW1xuICAncmVhY3QnLFxuICAncmVhY3QtZG9tJyxcbiAgJ2xvZGFzaC1lcycsXG4gICdtb21lbnQnLFxuICAnQGhhcm5lc3Npby9jYW5hcnknLFxuICAnQGhhcm5lc3Npby9mb3JtcycsXG4gICdAaGFybmVzc2lvL3VuaWZpZWQtcGlwZWxpbmUnLFxuICAncmVhY3Qtcm91dGVyLWRvbSdcbl1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGRlZmluZTogeyAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiAnXCJwcm9kdWN0aW9uXCInIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHlhbWwoe30pLFxuICAgIGR0cyh7XG4gICAgICBvdXREaXI6ICdkaXN0JyxcbiAgICAgIHRzY29uZmlnUGF0aDogJy4vdHNjb25maWcuanNvbicsXG4gICAgICBiZWZvcmVXcml0ZUZpbGU6IChmaWxlUGF0aCwgY29udGVudCkgPT4gKHtcbiAgICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoLnJlcGxhY2UoJ3NyYy8nLCAnJyksXG4gICAgICAgIGNvbnRlbnRcbiAgICAgIH0pXG4gICAgfSksXG4gICAgbW9uYWNvRWRpdG9yUGx1Z2luLmRlZmF1bHQoeyBjdXN0b21Xb3JrZXJzOiBbeyBlbnRyeTogJ21vbmFjby15YW1sL3lhbWwud29ya2VyJywgbGFiZWw6ICd5YW1sJyB9XSB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ3ZpZXdzJyxcbiAgICAgIGZpbGVOYW1lOiAnaW5kZXgnLFxuICAgICAgZm9ybWF0czogWydlcyddXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7IGV4dGVybmFsIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxlQUFlO0FBRXZWLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sd0JBQXdCO0FBTi9CLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sV0FBVztBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRLEVBQUUsd0JBQXdCLGVBQWU7QUFBQSxFQUNqRCxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLLENBQUMsQ0FBQztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLE1BQ1IsY0FBYztBQUFBLE1BQ2QsaUJBQWlCLENBQUMsVUFBVSxhQUFhO0FBQUEsUUFDdkMsVUFBVSxTQUFTLFFBQVEsUUFBUSxFQUFFO0FBQUEsUUFDckM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxtQkFBbUIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFLE9BQU8sMkJBQTJCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ3JHO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWUsRUFBRSxTQUFTO0FBQUEsRUFDNUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
