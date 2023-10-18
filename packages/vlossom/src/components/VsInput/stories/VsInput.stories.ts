import type { Meta, StoryObj } from '@storybook/vue3';

import VsInput, { InputType } from '../VsInput.vue';

const meta: Meta<typeof VsInput> = {
    title: 'Components/VsInput',
    component: VsInput,
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: '<vs-input v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme: {
            control: 'select',
            options: ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'],
        },
        type: {
            control: 'radio',
            options: [InputType.TEXT, InputType.NUMBER],
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsInput>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-input color-scheme="red" />
                <vs-input color-scheme="orange" />
                <vs-input color-scheme="yellow" />
                <vs-input color-scheme="green" />
                <vs-input color-scheme="teal" />
                <vs-input color-scheme="blue" />
                <vs-input color-scheme="indigo" />
                <vs-input color-scheme="purple" />
                <vs-input color-scheme="pink" />
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#eef1ff', fontColor: '#3f3f3f', border: '1px solid #4851aa' },
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const NoClear: Story = {
    args: {
        noClear: true,
    },
};

export const Placeholder: Story = {
    args: {
        placeholder: 'This is placeholder',
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};

export const Append: Story = {
    args: {
        append: {
            icon: 'search',
            action: () => {
                alert('append icon clicked');
            },
        },
    },
};

export const Prepend: Story = {
    args: {
        prepend: {
            icon: 'info',
            action: () => {
                alert('prepend icon clicked');
            },
        },
    },
};

export const Type: Story = {
    args: {
        type: 'number',
    },
};
