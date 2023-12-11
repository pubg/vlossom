import type { Meta, StoryObj } from '@storybook/vue3';

import VsInput, { InputType } from '../VsInput.vue';
import { colorScheme } from '@/declaration/storybook/arg-types';
import { ref } from 'vue';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { storybookUtil } from '@/utils';

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
    args: {
        placeholder: 'This is placeholder',
    },
    argTypes: {
        colorScheme,
        type: {
            control: 'radio',
            options: [InputType.TEXT, InputType.NUMBER],
        },
    },
};

meta.args = storybookUtil.getMetaArguments(VsInput.props, meta.args);
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
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="red" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="amber" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="green" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="teal" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="blue" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="indigo" />
                <vs-input v-model="value" v-bind="args" style="marginBottom: 10px" color-scheme="purple" />
                <vs-input v-model="value" v-bind="args" color-scheme="pink" />
            </div>
        `,
    }),
    args: {
        placeholder: 'This is placeholder',
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
        placeholder: 'email',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByPlaceholderText('email'), 'email@provider.com', { delay: 100 });
        await userEvent.hover(canvas.getByPlaceholderText('email'));

        await expect(canvas.queryAllByRole('button')).toHaveLength(0);
    },
};

export const Placeholder: Story = {
    args: {
        placeholder: 'Enter name',
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
                document.getElementsByClassName('vs-input')[0].insertAdjacentText('afterend', 'append icon clicked');
            },
        },
        placeholder: 'email',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByPlaceholderText('email'), 'email@provider.com', { delay: 100 });
        await userEvent.click(canvas.getAllByRole('button')[0]);

        await expect(canvas.getByText('append icon clicked')).toBeInTheDocument();
    },
};

export const Prepend: Story = {
    args: {
        prepend: {
            icon: 'info',
            action: () => {
                document.getElementsByClassName('vs-input')[0].insertAdjacentText('afterend', 'prepend icon clicked');
            },
        },
        placeholder: 'email',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByPlaceholderText('email'), 'email@provider.com', { delay: 100 });
        await userEvent.click(canvas.getAllByRole('button')[0]);

        await expect(canvas.getByText('prepend icon clicked')).toBeInTheDocument();
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
