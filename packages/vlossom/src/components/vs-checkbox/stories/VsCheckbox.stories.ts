import type { Meta, StoryObj } from '@storybook/vue3';
import { colorScheme, getMetaArguments } from '@/storybook/args';
import VsCheckbox from '../VsCheckbox.vue';
import { UIState } from '@/declaration/types';
import VsContainer from '@/components/vs-container/VsContainer.vue';

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
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Label: Story = {
    args: {
        label: 'Label',
    },
};

export const Messages: Story = {
    args: {
        messages: [{ state: UIState.SUCCESS, message: 'This is success message' }],
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
        width: { xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' },
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
        grid: { xs: 12, md: 6, lg: 3 },
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
