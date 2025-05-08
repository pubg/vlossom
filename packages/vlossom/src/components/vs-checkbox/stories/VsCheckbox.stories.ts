import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import { useVlossom } from '@/vlossom-framework';
import VsContainer from '@/components/vs-container/VsContainer.vue';
import VsCheckbox from './../VsCheckbox.vue';

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
				${getColorSchemeTemplate(`
					<vs-checkbox color-scheme="{{color}}" checkLabel="Checkbox" />
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
        messages: [{ state: 'success', text: 'This is success message' }],
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

export const Indeterminate: Story = {
    render: (args: any) => ({
        components: { VsCheckbox },
        setup() {
            return { args };
        },
        template: `
            <div >
            ${getColorSchemeTemplate(`
                <vs-checkbox v-bind="args" color-scheme="{{color}}" indeterminate check-label="Indeterminate" />
            `)}
            </div>
        `,
    }),
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
            <vs-container grid>
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
            borderRadius: '1.3rem',
            label: {
                fontColor: '#a0b0b9',
                fontSize: '0.8rem',
            },
            checkboxColor: '#81c798',
            checkboxSize: '4rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
