import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import VsProgress from './../VsProgress.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsProgress> = {
    title: 'Components/Base Components/VsProgress',
    component: VsProgress,
    render: (args: any) => ({
        components: { VsProgress },
        setup() {
            return { args };
        },
        template: '<vs-progress v-bind="args" />',
    }),
    tags: ['autodocs'],
    args: {
        value: 50,
        max: 100,
    },
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsProgress>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsProgress },
        template: `
			<div>
                ${getColorSchemeTemplate(`
                    <vs-progress color-scheme="{{ color }}" :value="60"/>
                `)}
			</div>
		`,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    render: () => ({
        components: { VsProgress },
        setup() {
            const styleSet = {
                barColor: '#ffc29b',
                valueColor: '#ff5342',
                borderRadius: '0.8rem',
                height: '1rem',
                width: '50%',
            };
            return { styleSet };
        },
        template: `
			<vs-progress :style-set="styleSet" :value="20" :max="200"/>
		`,
    }),
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
