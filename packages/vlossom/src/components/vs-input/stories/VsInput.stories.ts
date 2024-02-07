import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { colorScheme, getColorSchemeTemplate, getMetaArguments } from '@/storybook/args';
import VsInput from '../VsInput.vue';
import { InputType } from '../types';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import { chromaticParameters } from '@/storybook/parameters';
import { UIState } from '@/declaration';
import { VsIcon } from '@/icons';

import type { Meta, StoryObj } from '@storybook/vue3';

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
            options: [InputType.Text, InputType.Number],
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
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-input v-bind="args" color-scheme="{{ color }}" style="marginBottom: 10px" />
                `)}
            </div>
        `,
    }),
    args: {
        placeholder: 'this is placeholder',
    },
    parameters: {
        chromatic: chromaticParameters.theme,
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
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Label: Story = {
    args: {
        label: 'Label',
    },
};

export const Messages: Story = {
    args: {
        messages: [{ state: UIState.Success, message: 'This is success message' }],
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
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Append: Story = {
    render: (args: any) => ({
        components: { VsInput, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #append-icon>
                    <vs-icon aria-label="check" icon="check" />
                </template>
            </vs-input>
        `,
    }),
    args: {
        placeholder: 'email',
    },
    parameters: {
        chromatic: chromaticParameters.theme,
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
                <vs-input v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
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
