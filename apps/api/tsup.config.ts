import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    resolve: true,
  },
  onSuccess: 'node dist/index.js',
  minify: true,
  clean: true,
  ...options,
}))
