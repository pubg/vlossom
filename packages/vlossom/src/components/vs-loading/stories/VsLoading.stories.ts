import { colorScheme, getColorSchemeTemplate } from '@/storybook/args';
import VsLoading from './../VsLoading.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsLoading> = {
    title: 'Components/Base Components/VsLoading',
    component: VsLoading,
    render: (args: any) => ({
        components: { VsLoading },
        setup() {
            return { args };
        },
        template: '<vs-loading v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsLoading>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsLoading },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-loading v-bind="args" color-scheme="{{ color }}" />
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
            color: '#45e4c2',
            width: '20rem',
            height: '10rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
