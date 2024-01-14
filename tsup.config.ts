import { defineConfig, type Options } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/main.scss'],
  format: ['esm'],
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
