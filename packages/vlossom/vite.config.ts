import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), dts(), visualizer({ filename: 'visualizer.html' })],
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Vlossom',
            fileName: (format) => `vlossom.${format}.js`,
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
    // https://vitest.dev/config/
    test: {
        // 브라우저 환경에서 테스트하는 것을 명시
        environment: 'jsdom',
        root: fileURLToPath(new URL('./', import.meta.url)),
        setupFiles: ['src/test/setup.ts'],
        exclude: [...configDefaults.exclude, '**/stories/**', '**/*storybook/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            exclude: [...configDefaults.exclude, '**/stories/**', '**/*storybook/**'],
        },
    },
});
