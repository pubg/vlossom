import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ref } from 'vue';
import { colorScheme, getMetaArguments } from '@/storybook/args';
import VsInput, { InputType } from '../VsInput.vue';
import { UIState } from '@/declaration/types';

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
        placeholder: 'this is placeholder',
    },
    argTypes: {
        colorScheme,
        type: {
            control: 'radio',
            options: [InputType.TEXT, InputType.NUMBER],
        },
    },
};

meta.args = getMetaArguments(VsInput.props, meta.args);
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
        placeholder: 'this is placeholder',
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

export const Label: Story = {
    args: {
        label: 'Label',
    },
};

export const Messages: Story = {
    args: {
        messages: [{ state: UIState.SUCCESS, message: 'This is success message' }],
    },
};

export const Max: Story = {
    args: {
        label: 'Max 10',
        type: InputType.NUMBER,
        max: 10,
    },
};

export const Min: Story = {
    args: {
        label: 'Min 5',
        type: InputType.NUMBER,
        min: 5,
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
        placeholder: 'enter name',
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Label',
        required: true,
    },
};

export const Prepend: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            const value = ref('');
            return { value, args };
        },
        template: `
            <vs-input v-model="value" v-bind="args">
                <template #prepend-icon>
                    <svg aria-label="edit" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path fill="currentColor" d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                    </svg>
                </template>
            </vs-input>
        `,
    }),
    args: {
        placeholder: 'email',
    },
};

export const Append: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            const value = ref('');
            return { value, args };
        },
        template: `
            <vs-input v-model="value" v-bind="args">
                <template #append-icon>
                    <svg aria-label="search" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path fill="currentColor" d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </template>
            </vs-input>
        `,
    }),
    args: {
        placeholder: 'email',
    },
};
export const NumberType: Story = {
    args: {
        type: 'number',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#eef1ff', color: '#4851aa', border: '1px solid #4851aa' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
