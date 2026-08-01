import { defineConfig } from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        codes: 'src/codes.ts',
        predicates: 'src/predicates.ts',
        metadata: 'src/metadata.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    splitting: false,
    minify: true,
    treeshake: true,
});
