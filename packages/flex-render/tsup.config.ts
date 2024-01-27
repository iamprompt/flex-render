import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/main.scss'],
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    resolve: true,
  },
  // minify: true,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      filter: /\.scss$/,
    }),
  ],
  ...options,
}))
