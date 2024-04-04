import { chromaticParameters, colorScheme, getMetaArguments, state, getStateTemplate } from '@/storybook';
import { UIState } from '@/declaration';
import { useVlossom } from '@/vlossom-framework';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsCheckboxSet from '../VsCheckboxSet.vue';

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
        state,
    },
    args: {
        options: ['Apple', 'Banana', 'Carrot'],
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

export const State: Story = {
    render: (args: any) => ({
        components: { VsCheckboxSet },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-checkbox-set v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
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

export const Vertical: Story = {
    args: {
        vertical: true,
    },
};

export const BeforeChange: Story = {
    args: {
        beforeChange: async () => {
            const $vs = useVlossom();
            return await $vs.confirm.open('Are you sure?');
        },
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
            borderRadius: '0.8rem',
            focusBoxShadow: '0 0 0 3px #81c798',
            labelFontColor: '#a0b0b9',
            labelFontSize: '0.8rem',
            checkboxColor: '#81c798',
            checkboxSize: '4rem',
            checkboxGap: '3rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
