import { userEvent, within, expect } from '@storybook/test';
import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import { VsIcon } from '@/icons';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsInput from './../VsInput.vue';

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
            options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'],
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
                    <vs-input v-bind="args" color-scheme="{{ color }}" style="marginBottom: 4px" />
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
                    <vs-input v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 4px" />
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
        messages: [{ state: 'success', text: 'This is success message' }],
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
            const types = ['email', 'number', 'password', 'search', 'tel', 'text', 'url'];

            return { types };
        },
        template: `
            <form autocomplete="on">
                <vs-input v-for="type in types" :key="type" :type="type" :placeholder="type" style="marginBottom: 10px" />
            </form>
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

export const Prepend: Story = {
    render: (args: any) => ({
        components: { VsInput, VsIcon },
        setup() {
            return { args };
        },
        template: `
            <vs-input v-bind="args">
                <template #prepend>
                    <button :style="{ width: '100%', height: '100%', color: 'white' }" aria-label="check">
                        <vs-icon icon="success" size="24px" />
                    </button>
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
                <template #append>
                    <button :style="{ width: '100%', height: '100%', color: 'white' }" aria-label="check">
                        <vs-icon icon="success" size="24px" />
                    </button>
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
            <vs-container grid>
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
            padding: '2rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
