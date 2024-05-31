import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/vue3-vite';

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
    stories: ['./../src/**/*.chromatic.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@chromatic-com/storybook'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/vue3-vite'),
        options: {},
    },
};
export default config;
