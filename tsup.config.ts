import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    target: 'es2020',
    splitting: false,
    minify: true,
    treeshake: true,
    esbuildOptions(options) {
        options.drop = ['console', 'debugger'];
        options.treeShaking = true;
        options.mangleProps = /^_/;
        options.mangleQuoted = false;
        options.reserveProps = /^__/;
        options.minifyIdentifiers = true;
        options.minifySyntax = true;
        options.minifyWhitespace = true;
    },
});
