import { chromaticParameters, colorScheme, getColorSchemeTemplate } from '@/storybook';
import VsButton from './../VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsButton> = {
    title: 'Components/Base Components/VsButton',
    component: VsButton,
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: '<vs-button v-bind="args">Button</vs-button>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

// meta.args = getMetaArguments(VsButton.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsButton>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: () => ({
        components: { VsButton },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-button color-scheme="{{ color }}" :style="{ marginBottom: '5px' }">
                        Button
                    </vs-button>
                `)}
            </div>
        `,
    }),
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

export const Large: Story = {
    args: {
        large: true,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
    },
};

export const Responsive: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-button v-bind="args">Button</vs-button>
                <vs-button v-bind="args">Button</vs-button>
            </div>
        `,
    }),
    args: {
        responsive: true,
    },
    parameters: {
        chromatic: chromaticParameters.mobile,
    },
};

export const Outline: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-button color-scheme="{{ color }}" v-bind="args" :style="{ marginBottom: '5px' }">
                        Button
                    </vs-button>
                `)}
            </div>
        `,
    }),
    args: {
        outline: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-button color-scheme="{{ color }}" v-bind="args" :style="{ marginBottom: '5px' }">
                        Button
                    </vs-button>
                `)}
            </div>
        `,
    }),
    args: {
        primary: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: { backgroundColor: '#a5d6ad', fontSize: '2rem' },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};

export const Circle: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-button color-scheme="{{ color }}" v-bind="args" :style="{ marginBottom: '5px' }">
                        Button
                    </vs-button>
                `)}
            </div>
        `,
    }),
    args: {
        circle: true,
    },
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};
