import type { Meta, StoryObj } from '@storybook/vue3';

import VsButton from '../VsButton.vue';

const meta: Meta<typeof VsButton> = {
    title: 'Components/VsButton',
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
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-button color-scheme="red">Button</vs-button>
                <vs-button color-scheme="orange">Button</vs-button>
                <vs-button color-scheme="yellow">Button</vs-button>
                <vs-button color-scheme="green">Button</vs-button>
                <vs-button color-scheme="teal">Button</vs-button>
                <vs-button color-scheme="blue">Button</vs-button>
                <vs-button color-scheme="indigo">Button</vs-button>
                <vs-button color-scheme="purple">Button</vs-button>
                <vs-button color-scheme="pink">Button</vs-button>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#df120a', fontSize: '2rem' },
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
