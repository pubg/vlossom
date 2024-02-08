import { colorScheme, getColorSchemeTemplate } from '@/storybook/args';
import VsBlock from './../VsBlock.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsBlock> = {
    title: 'Components/Layout Components/VsBlock',
    component: VsBlock,
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: '<vs-block v-bind="args">This is block content</vs-block>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsBlock>;

export const Default: Story = {};

export const HasTitle: Story = {
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: `
            <vs-block v-bind="args">
                <template #title>This is block title</template>
                This is block content
            </vs-block>
        `,
    }),
};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-block v-bind="args" color-scheme="{{ color }}">This is {{ color }} block contents</vs-block>
			   `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const ColorSchemeWithHeader: Story = {
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-block v-bind="args" color-scheme="{{ color }}">
						<template #title>This is {{ color }} block title</template>
						This is {{ color }} block contents
					</vs-block>
			   `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    render: (args: any) => ({
        components: { VsBlock },
        setup() {
            return { args };
        },
        template: `
            <vs-block v-bind="args">
                <template #title>This is block title</template>
                This is block content
            </vs-block>
        `,
    }),
    args: {
        styleSet: {
            borderRadius: '0.8rem',
            fontWeight: '500',
            padding: '3rem 2rem',
            headerColor: '#ffb300',
            headerBackgroundColor: 'rgba(255, 246, 230, 1)',
            headerFontWeight: '600',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};