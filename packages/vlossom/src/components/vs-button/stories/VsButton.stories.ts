import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme } from '@/storybook/args';
import { modes } from '@/storybook/chromatic-modes';
import VsButton from './../VsButton.vue';
import { ref } from 'vue';

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
        setup() {
            const colorOptions = ref([...colorScheme.options]);
            return { colorOptions };
        },
        template: `
            <div>
				<vs-button v-for="color in colorOptions" :key="color" :color-scheme="color">
					Button
				</vs-button>
            </div>
        `,
    }),
    parameters: {
        chromatic: {
            modes: {
                light: modes.light,
                dark: modes.dark,
            },
        },
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
        chromatic: {
            modes: {
                light: modes.light,
                dark: modes.dark,
            },
        },
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

export const MobileFull: Story = {
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
        mobileFull: true,
    },
    parameters: {
        chromatic: {
            modes: {
                mobile: modes.mobile,
            },
        },
    },
};

export const Outline: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            const colorOptions = ref([...colorScheme.options]);
            return { colorOptions, args };
        },
        template: `
            <div>
				<vs-button v-for="color in colorOptions" :key="color" :color-scheme="color" v-bind="args">
					Button
				</vs-button>
            </div>
        `,
    }),
    args: {
        outline: true,
    },
    parameters: {
        chromatic: {
            modes: {
                light: modes.light,
                dark: modes.dark,
            },
        },
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsButton },
        setup() {
            const colorOptions = ref([...colorScheme.options]);
            return { colorOptions, args };
        },
        template: `
            <div>
				<vs-button v-for="color in colorOptions" :key="color" :color-scheme="color" v-bind="args">
					Button
				</vs-button>
            </div>
        `,
    }),
    args: {
        primary: true,
    },
    parameters: {
        chromatic: {
            modes: {
                light: modes.light,
                dark: modes.dark,
            },
        },
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
