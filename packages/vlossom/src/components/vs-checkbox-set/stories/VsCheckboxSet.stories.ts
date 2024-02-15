import { colorScheme, getMetaArguments } from '@/storybook/args';
import VsCheckboxSet from '../VsCheckboxSet.vue';
import { UIState } from '@/declaration';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import { chromaticParameters } from '@/storybook/parameters';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsCheckboxSet> = {
    title: 'Components/Input Components/VsCheckboxSet',
    component: VsCheckboxSet,
    render: (args: any) => ({
        components: { VsCheckboxSet },
        setup() {
            return { args };
        },
        template: '<vs-checkbox-set v-bind="args"  />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
    args: {
        options: ['apple', 'banana', 'carrot'],
    },
};

meta.args = getMetaArguments(VsCheckboxSet.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsCheckboxSet>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsCheckboxSet },
        setup() {
            const colorOptions = [...colorScheme.options];
            return { colorOptions, args };
        },
        template: `
            <div>
				<vs-checkbox-set v-for="color in colorOptions" :key="color" v-bind="args" :color-scheme="color" />
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
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
        label: 'Choose your favorite(s)',
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
        label: 'Choose your favorite(s)',
        required: true,
    },
};

export const Column: Story = {
    args: {
        column: true,
    },
};

export const Width: Story = {
    render: (args: any) => ({
        components: { VsCheckboxSet, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox-set v-bind="args" />
                <vs-checkbox-set v-bind="args" />
            </vs-container>
        `,
    }),
    args: {
        width: { md: '300px', lg: '400px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsCheckboxSet, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-checkbox-set v-bind="args" />
                <vs-checkbox-set v-bind="args" />
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
            checkboxMargin: '3rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
