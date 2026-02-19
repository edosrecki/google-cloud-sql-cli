import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: './dist',
  format: ['cjs'],
  platform: 'node',
  noExternal: /^.*$/,
  failOnWarn: false,
})
