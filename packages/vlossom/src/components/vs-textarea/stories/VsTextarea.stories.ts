import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import { UIState } from '@/declaration';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsTextarea from './../VsTextarea.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsTextarea> = {
    title: 'Components/Input Components/VsTextarea',
    component: VsTextarea,
    render: (args: any) => ({
        components: { VsTextarea },
        setup() {
            return { args };
        },
        template: '<vs-textarea v-bind="args" />',
    }),
    tags: ['autodocs'],
    args: {
        placeholder: 'enter text',
    },
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsTextarea.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsTextarea>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsTextarea },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-textarea v-bind="args" color-scheme="{{ color }}" style="marginBottom: 10px" />
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
        components: { VsTextarea },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-textarea v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
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

export const Width: Story = {
    render: (args: any) => ({
        components: { VsTextarea, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-textarea v-bind="args" />
                <vs-textarea v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsTextarea, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid>
                <vs-textarea v-bind="args" />
                <vs-textarea v-bind="args" />
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
