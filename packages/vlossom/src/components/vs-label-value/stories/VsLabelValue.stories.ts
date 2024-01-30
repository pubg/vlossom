import { colorScheme, getColorSchemeTemplate, verticalAlign } from '@/storybook/args';
import { chromaticParameters } from '@/storybook/parameters';
import VsLabelValue from '../VsLabelValue.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const contents = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Possimus, voluptatem cum? Atque facilis mollitia distinctio
perferendis sed voluptates omnis sit maxime ad! Porro incidunt
voluptatem quaerat sint itaque, blanditiis excepturi!`;

const meta: Meta<typeof VsLabelValue> = {
    title: 'Components/Base Components/VsLabelValue',
    component: VsLabelValue,
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `<vs-label-value v-bind="args"><template #label>label</template><template #value>${contents}</template></vs-label-value>`,
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
                    <vs-label-value color-scheme="{{ color }}"><template #label>label</template><template #value>${contents}</template></vs-label-value>
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
                    <vs-label-value color-scheme="{{ color }}" primary><template #label>label</template><template #value>${contents}</template></vs-label-value>
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
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${contents}</template>
            <template #actions><vs-button dense primary>action</vs-button></template>
        </vs-label-value>
        `,
    }),
};

export const VerticalAlignTop: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${contents}</template>
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
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
        <vs-label-value v-bind="args">
            <template #label>label</template>
            <template #value>${contents}</template>
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
            labelBackgroundColor: '#fdcedf',
            labelColor: '#a7727d',
            labelFontWeight: '550',
            labelWidth: '15rem',
            padding: '2rem 2rem',
        },
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
