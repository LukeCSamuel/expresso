import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        post: 'src/post/index.ts',
      },
      formats: ['es', 'cjs'],
      fileName (format, entryAlias) {
        return `${entryAlias}.${format === 'es' ? 'm' : 'c'}js`;
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
