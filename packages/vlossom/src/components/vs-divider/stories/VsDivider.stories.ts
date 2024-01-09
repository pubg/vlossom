import type { Meta, StoryObj } from '@storybook/vue3';

import VsDivider from '../VsDivider.vue';
import { colorScheme } from '@/storybook/args';
import { modes } from '@/storybook/chromatic-modes';

const meta: Meta<typeof VsDivider> = {
    title: 'Components/Base Components/VsDivider',
    component: VsDivider,
    render: (args: any) => ({
        components: { VsDivider },
        setup() {
            return { args };
        },
        template: '<vs-divider v-bind="args"/>',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsDivider>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: any) => ({
        components: { VsDivider },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-divider v-bind="args" color-scheme="red"/>
                <vs-divider v-bind="args" color-scheme="amber"/>
                <vs-divider v-bind="args" color-scheme="green"/>
                <vs-divider v-bind="args" color-scheme="teal"/>
                <vs-divider v-bind="args" color-scheme="blue"/>
                <vs-divider v-bind="args" color-scheme="indigo"/>
                <vs-divider v-bind="args" color-scheme="purple"/>
                <vs-divider v-bind="args" color-scheme="pink"/>
            </div>
        `,
    }),
};

export const StyleSet: Story = {
    args: {
        styleSet: { lineColor: '#2d9596', lineStyle: 'dashed', lineWidth: '3px' },
    },
};

export const Vertical: Story = {
    args: {
        vertical: true,
    },
    render: (args: any) => ({
        components: { VsDivider },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-divider v-bind="args" />
                <vs-divider v-bind="args" />
                <vs-divider v-bind="args" />
            </div>
        `,
    }),
};

export const VerticalWithMobileFull: Story = {
    args: {
        vertical: true,
        mobileFull: true,
    },
    render: (args: any) => ({
        components: { VsDivider },
        setup() {
            return { args };
        },
        template: `
            <div>
                <vs-divider v-bind="args" />
                <vs-divider v-bind="args" />
                <vs-divider v-bind="args" />
            </div>
        `,
    }),
    parameters: {
        chromatic: {
            modes: {
                mobile: modes.mobile,
            },
        },
    },
};

export const VerticalWithStyleSet: Story = {
    args: {
        styleSet: { lineColor: '#ef4040', lineWidth: '2.5px', verticalHeight: '4rem' },
        vertical: true,
    },
};

export const PreDefinedStyleSet: Story = {
    args: {
        styleSet: 'myStyleSet',
    },
};
