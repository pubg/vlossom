import { setup } from '@storybook/vue3';
import { createVlossom } from '../src';
import { styleSet } from '../src/storybook/style-sets';
import './../src/styles/index.scss';

import type { Preview } from '@storybook/vue3';

const vlossom = createVlossom({
    styleSet,
});

setup((app) => {
    app.use(vlossom);
});

const decorators = [
    (story: any, context: any) => {
        const backgrounds = context.globals.backgrounds;

        if (backgrounds) {
            if (backgrounds.value === '#f8f8f8') {
                document.body.classList.remove('vs-dark');
            } else {
                document.body.classList.add('vs-dark');
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
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '390px', height: '800px' } },
                tablet: { name: 'Tablet', styles: { width: '834px', height: '1000px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '1000px' } },
            },
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        reviewOnFail: true,
                    },
                ],
            },
        },
    },
    decorators,
};

export default preview;
