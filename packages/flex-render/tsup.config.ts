import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: {
      entry: ['src/index.ts'],
      resolve: true,
    },
    treeshake: true,
    minify: !options.watch,
    sourcemap: !!options.watch,
    clean: !options.watch,
    esbuildPlugins: [
      sassPlugin({
        filter: /\.scss$/,
      }),
    ],
    ...options,
  }
})
