import type { Meta, StoryObj } from '@storybook/vue3';

import VsButton from '../VsButton.vue';

const meta: Meta<typeof VsButton> = {
    title: 'Vlossom/VsButton',
    component: VsButton,
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: '<vs-button v-bind="args">Button</vs-button>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme: {
            control: 'select',
            options: ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsButton>;

export const Default: Story = {};

export const ColorScheme: Story = {
    args: {
        colorScheme: 'red',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#df120a', fontSize: '20px' },
    },
};

export const Dense: Story = {
    args: {
        dense: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Large: Story = {
    args: {
        large: true,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
    },
};

export const MobileFull: Story = {
    args: {
        mobileFull: true,
    },
};

export const Outline: Story = {
    args: {
        outline: true,
    },
};

export const Primary: Story = {
    args: {
        primary: true,
    },
};
