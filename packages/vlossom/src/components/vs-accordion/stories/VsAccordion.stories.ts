import { colorScheme, getColorSchemeTemplate, LOREM_IPSUM, chromaticParameters } from '@/storybook';
import VsAccordion from './../VsAccordion.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsAccordion> = {
    title: 'Components/Layout Components/VsAccordion',
    component: VsAccordion,
    render: (args: any) => ({
        components: { VsAccordion },
        setup() {
            return { args };
        },
        template: `
            <vs-accordion v-bind="args">
                <template #title>Hello, Vlossom!</template>
                ${LOREM_IPSUM}
            </vs-accordion>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsAccordion>;

export const Default: Story = {};

export const Open: Story = {
    args: {
        open: true,
    },
};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsAccordion },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-accordion v-bind="args" color-scheme="{{ color }}" :style="{ marginBottom: '0.4rem' }">
                        <template #title>Hello, Vlossom!</template>
                        ${LOREM_IPSUM}
                    </vs-accordion>
			   `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            border: '1px solid #1e88e5',
            borderRadius: '0.7rem',
            titleColor: '#1e4335',
            titleBackgroundColor: '#456585',
            titlePadding: '1rem',
            contentsColor: '#1e88e5',
            contentsBackgroundColor: '#f5f5f5',
            contentsPadding: '2rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
