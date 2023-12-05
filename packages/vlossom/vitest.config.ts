// vitest.config.ts
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [vue()],
    // test 코드 내에서 @ alias 사용을 위해 셋팅
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        // 브라우저 환경에서 테스트하는 것을 명시
        environment: 'jsdom',
        root: fileURLToPath(new URL('./', import.meta.url)),
    },
});
