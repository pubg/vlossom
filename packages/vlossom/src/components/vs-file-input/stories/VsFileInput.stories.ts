import { chromaticParameters, colorScheme, getMetaArguments, getColorSchemeTemplate } from '@/storybook';
import { UIState } from '@/declaration';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsFileInput from './../VsFileInput.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFileInput> = {
    title: 'Components/Input Components/VsFileInput',
    component: VsFileInput,
    render: (args: any) => ({
        components: { VsFileInput },
        setup() {
            return { args };
        },
        template: '<vs-file-input v-bind="args" />',
    }),
    tags: ['autodocs'],
    args: {
        placeholder: 'this is placeholder',
        label: 'File Input',
    },
    argTypes: {
        colorScheme,
    },
};

meta.args = getMetaArguments(VsFileInput.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsFileInput>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsFileInput },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-file-input color-scheme="{{ color }}" :style="{ marginBottom: '5px' }" v-bind="args" />
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
        messages: [{ state: UIState.Success, text: 'This is success message' }],
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

export const Width: Story = {
    render: (args: any) => ({
        components: { VsFileInput, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-file-input v-bind="args" />
                <vs-file-input v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsFileInput, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-file-input v-bind="args" />
                <vs-file-input v-bind="args" />
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
            borderColor: 'orange',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: '#ffe0b2',
            color: '#d84315',
            clearButtonColor: '#FC6736',
            dragBackgroundColor: '#ffcc80',
            fontSize: '1.3rem',
            prependBackgroundColor: '#ef6c00',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
