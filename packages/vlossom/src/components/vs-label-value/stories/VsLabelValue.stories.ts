import { chromaticParameters, colorScheme, getColorSchemeTemplate, verticalAlign, LOREM_IPSUM } from '@/storybook';
import VsLabelValue from './../VsLabelValue.vue';
import VsButton from '@/components/vs-button/VsButton.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsLabelValue> = {
    title: 'Components/Base Components/VsLabelValue',
    component: VsLabelValue,
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `<vs-label-value v-bind="args"><template #label>label</template><template #value>${LOREM_IPSUM}</template></vs-label-value>`,
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
        verticalAlign,
    },
};

export default meta;
type Story = StoryObj<typeof VsLabelValue>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-label-value color-scheme="{{ color }}" :style="{marginBottom: '8px'}">
                        <template #label>label</template><template #value>${LOREM_IPSUM}</template>
                    </vs-label-value>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-label-value color-scheme="{{ color }}" primary :style="{marginBottom: '8px'}">
                        <template #label>label</template><template #value>${LOREM_IPSUM}</template>
                    </vs-label-value>
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const HasActions: Story = {
    render: (args: any) => ({
        components: { VsLabelValue, VsButton },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${LOREM_IPSUM}</template>
            <template #actions><vs-button dense primary>action</vs-button></template>
        </vs-label-value>
        `,
    }),
};

export const VerticalAlignTop: Story = {
    render: (args: any) => ({
        components: { VsLabelValue, VsButton },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${LOREM_IPSUM}</template>
            <template #actions><vs-button dense primary>action</vs-button></template>
        </vs-label-value>
        `,
    }),
    args: {
        verticalAlign: 'top',
    },
};

export const VerticalAlignBottom: Story = {
    render: (args: any) => ({
        components: { VsLabelValue, VsButton },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${LOREM_IPSUM}</template>
            <template #actions><vs-button dense primary>action</vs-button></template>
        </vs-label-value>
        `,
    }),
    args: {
        verticalAlign: 'bottom',
    },
};

export const StyleSet: Story = {
    args: {
        styleSet: {
            backgroundColor: '#f8e8ee',
            fontSize: '1.3rem',
            label: {
                backgroundColor: '#fdcedf',
                fontColor: '#a7727d',
                fontWeight: '550',
                fontSize: '5rem',
                width: '15rem',
            },
            padding: '2rem 2rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
