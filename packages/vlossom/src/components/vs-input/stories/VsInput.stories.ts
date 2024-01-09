import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { colorScheme, getMetaArguments } from '@/storybook/args';
import VsInput, { InputType } from '../VsInput.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import SearchIcon from '@/assets/icons/search';
import { UIState } from '@/declaration/types';

const meta: Meta<typeof VsInput> = {
    title: 'Components/Input Components/VsInput',
    component: VsInput,
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: '<vs-input v-bind="args" />',
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

export const Default: Story = {
    parameters: {
        chromatic: {
            modes: {
                light: { backgrounds: { value: '#f8f8f8' } },
                dark: { backgrounds: { value: '#24252a' } },
            },
        },
    },
};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-input v-bind="args" color-scheme="red" style="marginBottom: 10px"  />
                <vs-input v-bind="args" color-scheme="amber" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="green" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="teal" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="blue" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="indigo" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="purple" style="marginBottom: 10px" />
                <vs-input v-bind="args" color-scheme="pink" />
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

export const NumberType: Story = {
    args: {
        type: 'number',
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
            return { args };
        },
        template: `
            <vs-input v-bind="args">
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
        components: { VsInput, SearchIcon },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #append-icon>
                    <search-icon aria-label="search" />
                </template>
            </vs-input>
        `,
    }),
    args: {
        placeholder: 'email',
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsInput, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-input v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsInput, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-input v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { sm: 6, md: 4, lg: 3 },
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
