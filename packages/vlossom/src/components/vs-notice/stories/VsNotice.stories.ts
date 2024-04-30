import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import VsNotice from '../VsNotice.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsNotice> = {
    title: 'Components/Base Components/VsNotice',
    component: VsNotice,
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: '<vs-notice v-bind="args">Hello! This is Vlossom Notice Content</vs-notice>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsNotice>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-notice color-scheme="{{ color }}" style="margin-bottom:1rem">Hello! This is Vlossom {{ color }} notice content</vs-notice>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const TitleSlot: Story = {
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
			<vs-notice>
				<template #title><span>Please Note 📌</span></template>
				Hello! This is Vlossom Notice Content
			</vs-notice>
		`,
    }),
};

export const PrimaryFalse: Story = {
    render: (args: any) => ({
        components: { VsNotice },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-notice color-scheme="{{ color }}" :primary="false" style="margin-bottom:1rem">Hello! This is Vlossom {{ color }} notice</vs-notice>
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
        styleSet: { backgroundColor: '#a5d6ad', contentFontSize: '2rem' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
