import { setup } from '@storybook/vue3';
import { createVlossom, useVlossom } from './../src';
import './../src/styles/index.scss';

import type { Preview } from '@storybook/vue3';

const vlossom = createVlossom();

setup((app) => {
    app.use(vlossom);
});

const decorators = [
    (story: any, context: any) => {
        const backgrounds = context.globals.backgrounds;

        if (backgrounds) {
            if (backgrounds.value === '#f8f8f8') {
                useVlossom().theme = 'light';
            } else {
                useVlossom().theme = 'dark';
            }
        }

        return {
            components: { story },
            template: '<div style="margin: 2rem;"><story /></div>',
        };
    },
];

const preview: Preview = {
    parameters: {
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
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '390px', height: '800px' } },
                tablet: { name: 'Tablet', styles: { width: '834px', height: '1000px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '1000px' } },
            },
        },
    },
    decorators,
};

export default preview;
