import type { Preview } from '@storybook/vue3';

import '@/styles/index.scss';

const decorators = [
    (story, context) => {
        const backgrounds = context.globals.backgrounds;

        if (backgrounds) {
            if (context.globals.backgrounds.value === '#f8f8f8') {
                document.body.classList.remove('vs-dark');
                document.body.classList.add('vs-light');
            } else {
                document.body.classList.remove('vs-light');
                document.body.classList.add('vs-dark');
            }
        }

        return {
            components: { story },
            template: '<story />',
        };
    },
];

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#f8f8f8',
                },
                {
                    name: 'dark',
                    value: '#24252a',
                },
            ],
        },
    },
    decorators,
};

export default preview;
