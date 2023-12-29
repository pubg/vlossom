import type { Meta, StoryObj } from '@storybook/vue3';

import VsLabelValue from '../VsLabelValue.vue';
import { colorScheme, verticalAlign } from '@/storybook/args';

const value = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
Possimus, voluptatem cum? Atque facilis mollitia distinctio
perferendis sed voluptates omnis sit maxime ad! Porro incidunt
voluptatem quaerat sint itaque, blanditiis excepturi!`;

const meta: Meta<typeof VsLabelValue> = {
    title: 'Components/Layout Components/VsLabelValue',
    component: VsLabelValue,
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `<vs-label-value v-bind="args"><template #label>label</template><template #value>${value}</template></vs-label-value>`,
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
                <vs-label-value color-scheme="red"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="amber"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="green"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="teal"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="blue"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="indigo"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="purple"><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="pink"><template #label>label</template><template #value>${value}</template></vs-label-value>
            </div>
        `,
    }),
};

export const Primary: Story = {
    render: (args: any) => ({
        components: { VsLabelValue },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-label-value color-scheme="red" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="amber" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="green" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="teal" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="blue" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="indigo" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="purple" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
                <vs-label-value color-scheme="pink" primary><template #label>label</template><template #value>${value}</template></vs-label-value>
            </div>
        `,
    }),
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
            <template #value>${value}</template>
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
            <template #value>${value}</template>
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
            <template #value>${value}</template>
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
