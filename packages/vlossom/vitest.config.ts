import { defineConfig, configDefaults } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'node:url';

// https://vitest.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        // 브라우저 환경에서 테스트하는 것을 명시
        environment: 'jsdom',
        root: fileURLToPath(new URL('./', import.meta.url)),
        exclude: [...configDefaults.exclude, '**/stories/**', '**/*storybook/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            exclude: [...configDefaults.exclude, '**/stories/**', '**/*storybook/**'],
        },
    },
});
