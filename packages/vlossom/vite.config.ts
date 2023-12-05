import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig, configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'Vlossom',
            fileName: 'vlossom',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});

// https://vitest.dev/config/
const vitestConfig = defineVitestConfig({
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

export default mergeConfig(viteConfig, vitestConfig);
