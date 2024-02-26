import { colorScheme, getColorSchemeTemplate, chromaticParameters } from '@/storybook';
import VsPagination from './../VsPagination.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsPagination> = {
    title: 'Components/Base Components/VsPagination',
    component: VsPagination,
    render: (args: any) => ({
        components: { VsPagination },
        setup() {
            const length = 20;
            return { args, length };
        },
        template: '<vs-pagination v-bind="args" :length="length" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsPagination>;

export const Default: Story = {};

export const Length: Story = {
    args: {
        length: 20,
    },
};

export const EdgeButtons: Story = {
    args: {
        length: 20,
        edgeButtons: true,
    },
};

export const ShowingLength: Story = {
    args: {
        length: 20,
        showingLength: 7,
        edgeButtons: true,
    },
};

export const Disabled: Story = {
    args: {
        length: 20,
        disabled: true,
    },
};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsPagination },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-pagination v-bind="args" :length="20" color-scheme="{{ color }}" :style="{ marginBottom: '2rem' }" />
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
        length: 20,
        styleSet: {
            backgroundColor: '#4e28e5',
            borderRadius: '0.4rem',
            buttonHeight: '2rem',
            buttonWidth: '3rem',
            color: '#fff',
            fontSize: '1.2rem',
            gap: '0.4rem',
            selectedBackgroundColor: '#a5d6a7',
            selectedColor: '#1e88e5',
            selectedFontSize: '1.5rem',
            selectedFontWeight: '600',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        length: 20,
        styleSet: 'myStyleSet',
    },
};
