import { sassPlugin } from 'esbuild-sass-plugin'
import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts', 'src/components/react/FlexPreview.tsx'],
  format: ['esm', 'cjs'],
  dts: {
    entry: ['src/index.ts', 'src/components/react/FlexPreview.tsx'],
    resolve: true,
  },
  treeshake: true,
  minify: true,
  clean: true,
  esbuildPlugins: [
    sassPlugin({
      filter: /\.scss$/,
    }),
  ],
  ...options,
}))
