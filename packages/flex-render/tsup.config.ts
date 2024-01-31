import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    resolve: true,
  },
  minify: true,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      filter: /\.scss$/,
    }),
  ],
  ...options,
}))
