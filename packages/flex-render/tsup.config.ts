import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: ['src/index.ts'],
    resolve: true,
  },
  treeshake: true,
  minify: !options.watch,
  sourcemap: !!options.watch,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      filter: /\.scss$/,
    }),
  ],
  ...options,
}))
