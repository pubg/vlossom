import { chromaticParameters, colorScheme, getMetaArguments, state, getStateTemplate } from '@/storybook';
import { UIState } from '@/declaration';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsCheckbox from '../VsCheckbox.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsCheckbox> = {
    title: 'Components/Input Components/VsCheckbox',
    component: VsCheckbox,
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            return { args };
        },
        template: '<vs-checkbox v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        checkLabel: 'Checkbox',
    },
};

meta.args = getMetaArguments(VsCheckbox.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsCheckbox>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsCheckbox },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions };
        },
        template: `
            <div>
				<vs-checkbox v-for="color in colorOptions" :key="color" :color-scheme="color" checkLabel="Checkbox" />
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const State: Story = {
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-checkbox v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
                `)}
            </div>
        `,
    }),
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

export const Width: Story = {
    render: (args: any) => ({
        components: { VsCheckbox, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox v-bind="args" />
                <vs-checkbox v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsCheckbox, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox v-bind="args" />
                <vs-checkbox v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        grid: { md: 6, lg: 3 },
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#81c798',
            border: '3px solid #81c798',
            borderRadius: '0.8rem',
            focusBoxShadow: '0 0 0 3px #81c798',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
