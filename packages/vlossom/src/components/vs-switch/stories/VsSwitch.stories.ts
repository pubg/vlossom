import { computed, ref } from 'vue';
import {
    chromaticParameters,
    colorScheme,
    getColorSchemeTemplate,
    getMetaArguments,
    state,
    getStateTemplate,
} from '@/storybook';
import VsSwitch from './../VsSwitch.vue';
import VsContainer from '@/components/vs-container/VsContainer.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsSwitch> = {
    title: 'Components/Input Components/VsSwitch',
    component: VsSwitch,
    render: (args: any) => ({
        components: { VsSwitch },
        setup() {
            return { args };
        },
        template: '<vs-switch v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        state,
    },
};

meta.args = getMetaArguments(VsSwitch.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsSwitch>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsSwitch },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-switch v-bind="args" color-scheme="{{ color }}" :style="{ marginBottom: '5px' }"  />
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
        components: { VsSwitch },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getStateTemplate(`
                    <vs-switch v-bind="args" label="State ({{state}})" state="{{state}}" style="marginBottom: 16px" />
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
        label: 'Custom Label',
    },
};

export const TrueLabelAndFalseLabel: Story = {
    args: {
        trueLabel: 'Approved',
        falseLabel: 'Rejected',
    },
};

export const Messages: Story = {
    render: (args: any) => ({
        components: { VsSwitch },
        setup() {
            const value = ref(false);
            const messages = computed(() => {
                if (!value.value) {
                    return [{ state: 'error', text: 'This is error message' }];
                }

                return [{ state: 'success', text: 'This is success message' }];
            });

            return { args, value, messages };
        },
        template: '<vs-switch v-model="value" :messages="messages" />',
    }),
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
        components: { VsSwitch, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container>
                <vs-switch v-bind="args" />
                <vs-switch v-bind="args"  style="margin-top: 5px"/>
            </vs-container>
        `,
    }),
    args: {
        width: { sm: '200px', md: '300px', lg: '400px', xl: '500px' },
    },
};

export const Grid: Story = {
    render: (args: any) => ({
        components: { VsSwitch, VsContainer },
        setup() {
            return { args };
        },
        template: `
            <vs-container grid row-gap="5px">
                <vs-switch v-bind="args" />
                <vs-switch v-bind="args" />
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
            falseBorder: '3px solid blue',
            falseBackgroundColor: '#000',
            falseFontColor: '#fff',
            falseHandleColor: '#fff',
            trueBorder: '3px solid purple',
            trueBackgroundColor: '#fff',
            trueFontColor: '#000',
            trueHandleColor: '#000',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
