import {
    chromaticParameters,
    colorScheme,
    getMetaArguments,
    getColorSchemeTemplate,
    state,
    getStateTemplate,
} from '@/storybook';
import { UIState } from '@/declaration';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsRadio from './../VsRadio.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsRadio> = {
    title: 'Components/Input Components/VsRadio',
    component: VsRadio,
    render: (args: any) => ({
        components: { VsRadio },
        setup() {
            return { args };
        },
        template: '<vs-radio v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
    args: {
        radioLabel: 'Radio Input',
        noMessage: true,
        name: 'test',
        radioValue: 'test',
    },
};

meta.args = getMetaArguments(VsRadio.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsRadio>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsRadio },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-radio v-bind="args"
                        color-scheme="{{ color }}"
                        name="color"
                        radio-value="{{ color }}"
                        radio-label="Radio ({{ color }})"
                    />
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const State: Story = {
    render: (args: any) => ({
        components: { VsRadio },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-radio v-bind="args" label="State ({{state}})" state="{{state}}" radio-value="{{state}}" radio-label="{{state}}" style="marginBottom: 16px" />
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
        messages: [{ state: UIState.Info, text: 'This is info message' }],
        noMessage: false,
    },
};

export const Readonly: Story = {
    args: {
        readonly: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Radio (required)',
        required: true,
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsRadio, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-radio v-bind="args" name="width" radio-value="test1" />
                <vs-radio v-bind="args" name="width" radio-value="test2" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsRadio, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-radio v-bind="args" name="grid" radio-value="test1" />
                <vs-radio v-bind="args" name="grid" radio-value="test2" />
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
            labelFontColor: '#ac77c8',
            labelFontSize: '1.5rem',
            radioColor: '#41c798',
            radioSize: '2rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
