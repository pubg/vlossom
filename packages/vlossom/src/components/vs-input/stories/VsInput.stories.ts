import { userEvent, within, expect } from '@storybook/test';
import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import { UIState } from '@/declaration';
import { VsIcon } from '@/icons';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import { InputType } from '../types';
import VsInput from '../VsInput.vue';

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
            options: Object.values(InputType),
        },
        state,
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

export const State: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-input v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
                `)}
            </div>
        `,
    }),
    args: {
        placeholder: 'enter here',
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
        messages: [{ state: UIState.Success, text: 'This is success message' }],
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

export const Type: Story = {
    render: () => ({
        components: { VsInput },
        setup() {
            const types = Object.values(InputType);

            return { types };
        },
        template: `
            <div>
                <vs-input v-for="type in types" :key="type" :type="type" :placeholder="type" style="marginBottom: 10px" />
            </div>
        `,
    }),
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

export const PrependButton: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #prepend-button>
                    <svg aria-label="edit" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
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

export const AppendButton: Story = {
    render: (args: any) => ({
        components: { VsInput, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #append-button>
                    <vs-icon icon="check" />
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

export const PrependContent: Story = {
    render: (args: any) => ({
        components: { VsInput },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #prepend-content>
                    <div style="padding: 3px">prepend</div>
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

export const AppendContent: Story = {
    render: (args: any) => ({
        components: { VsInput, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #append-content>
                    <div style="padding: 3px">append</div>
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
        styleSet: {
            backgroundColor: '#eef1ff',
            fontColor: '#4851aa',
            border: '1px solid #4851aa',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
