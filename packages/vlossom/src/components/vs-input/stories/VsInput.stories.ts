import type { Meta, StoryObj } from '@storybook/vue3';

import VsInput, { InputType } from '../VsInput.vue';
import { colorScheme } from '@/declaration/storybook/arg-types';
import { ref } from 'vue';

const meta: Meta<typeof VsInput> = {
    title: 'Components/Input Components/VsInput',
    component: VsInput,
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            const value = ref('');
            return { value, args };
        },
        template: '<vs-input v-model="value" v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
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
            const value = ref('');
            return { value, args };
        },
        template: `
            <div>
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="red" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="amber" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="green" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="teal" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="blue" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="indigo" />
                <vs-input v-model="value" style="marginBottom: 10px" color-scheme="purple" />
                <vs-input v-model="value" color-scheme="pink" />
            </div>
        `,
    }),
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

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#eef1ff', fontColor: '#3f3f3f', border: '1px solid #4851aa' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
