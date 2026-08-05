import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const configDirectory = dirname(fileURLToPath(import.meta.url));

export default [
    {
        ignores: ['dist/', 'node_modules/'],
    },
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: configDirectory,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'warn',
        },
    },
    eslintConfigPrettier,
];
