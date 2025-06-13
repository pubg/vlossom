import {
    chromaticParameters,
    colorScheme,
    getMetaArguments,
    getColorSchemeTemplate,
    state,
    getStateTemplate,
} from '@/storybook';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsFileDrop from './../VsFileDrop.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFileDrop> = {
    title: 'Components/Input Components/VsFileDrop',
    component: VsFileDrop,
    render: (args: any) => ({
        components: { VsFileDrop },
        setup() {
            return { args };
        },
        template: '<vs-file-drop v-bind="args" />',
    }),
    tags: ['autodocs'],
    args: {
        placeholder: 'this is placeholder',
        label: 'File Drop',
    },
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsFileDrop.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsFileDrop>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsFileDrop },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-file-drop v-bind="args" color-scheme="{{ color }}" :style="{ marginBottom: '5px' }" />
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
        components: { VsFileDrop },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-file-drop v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
                `)}
            </div>
        `,
    }),
};

export const Accept: Story = {
    args: {
        accept: '.png',
        placeholder: 'upload png image here...',
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
        label: 'Custom Label',
    },
};

export const Messages: Story = {
    args: {
        messages: [{ state: 'success', text: 'This is success message' }],
    },
};

export const multiple: Story = {
    args: {
        multiple: true,
    },
};

export const Placeholder: Story = {
    args: {
        placeholder: 'upload image here...',
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

export const WidthAndHeight: Story = {
    render: (args: any) => ({
        components: { VsFileDrop, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-file-drop v-bind="args" :width="'700px'" :height="'700px'" :placeholder="'size: 700px'" />
                <vs-file-drop v-bind="args" :height="'100px'" :placeholder="'height: 100px'" />
                <vs-file-drop v-bind="args" :width="'100px'" :placeholder="'width: 100px'" />
            </vs-container>
        `,
    }),
    args: {},
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsFileDrop, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid>
                <vs-file-drop v-bind="args" />
                <vs-file-drop v-bind="args" />
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
            border: '1px solid orange',
            borderRadius: '10px',
            backgroundColor: '#ffe0b2',
            fontColor: '#d84315',
            dragBackgroundColor: '#ffcc80',
            fontSize: '1.3rem',
            padding: '0 3rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
