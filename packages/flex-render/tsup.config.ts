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
    external: [
      /^node:/,
      'stream',
      'http',
      'https',
      'events',
      'url',
      'buffer',
      'util',
      'crypto',
      'zlib',
      'fs',
      'path',
      'net',
      'tls',
      'dns',
      'constants',
      'os',
    ],
    esbuildPlugins: [
      sassPlugin({
        filter: /\.scss$/,
      }),
    ],
    ...options,
  }
})
