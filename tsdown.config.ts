import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Never raise this. The emitted syntax level is the one part of the support
  // policy that is still strictly additive, so it stays where consumers found it.
  target: 'es2015',
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
});
