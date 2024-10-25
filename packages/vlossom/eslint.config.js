import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', 'visualizer.html'] },
    {
        rules: {
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', { before: false, after: true }],
            semi: ['error', 'always'],
            'no-extra-semi': 'error',
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'computed-property-spacing': ['error', 'never'],
            'no-trailing-spaces': 'error',
            'array-element-newline': ['error', 'consistent'],
            'arrow-parens': ['error', 'always'],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    named: 'never',
                    asyncArrow: 'always',
                },
            ],
            'key-spacing': [
                'error',
                {
                    beforeColon: false,
                    afterColon: true,
                },
            ],
            'max-len': [
                'warn',
                {
                    code: 120,
                    ignoreComments: true,
                    ignoreTrailingComments: true,
                    ignoreUrls: true,
                    ignorePattern: '(d="([\\s\\S]*?)")|(<.+)',
                    ignoreRegExpLiterals: true,
                },
            ],
            curly: 'error',
            'brace-style': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'no-multiple-empty-lines': 'error',
            'no-var': 'error',
            'no-with': 'error',
            'one-var': ['error', 'never'],
            'no-empty': 'error',
            'no-cond-assign': ['error', 'always'],
            'eol-last': ['error', 'always'],
            'no-shadow': 'off',
            'no-prototype-builtins': 'off',
            '@typescript-eslint/no-shadow': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
        },
    },
];
