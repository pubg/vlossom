import { colorScheme, cssPosition, LOREM_IPSUM } from '@/storybook';
import VsHeader from './../VsHeader.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsHeader> = {
    title: 'Chromatic/Layout Components/VsHeader',
    component: VsHeader,
    render: (args: any) => ({
        components: { VsHeader },
        setup() {
            return { args };
        },
        template: `
            <div>
                <div style="background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <vs-header height="80px" v-bind="args" verticalAlign="start"> This is Header Content </vs-header>
                    <div style="padding-top:80px;">${LOREM_IPSUM}</div>
                </div>

                <div style="background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <vs-header height="80px" v-bind="args"> This is Header Content </vs-header>
                    <div style="padding-top:80px;">${LOREM_IPSUM}</div>
                </div>

                <div style="background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <vs-header height="80px" v-bind="args" verticalAlign="end"> This is Header Content </vs-header>
                    <div style="padding-top:80px;">${LOREM_IPSUM}</div>
                </div>

                <div style="background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <vs-header primary height="80px" v-bind="args"> This is Header Content </vs-header>
                    <div style="padding-top:80px;">${LOREM_IPSUM}</div>
                </div>
            </div>`,
    }),
    args: {
        position: 'absolute',
    },
    argTypes: {
        colorScheme,
        position: cssPosition,
    },
};
export default meta;
type Story = StoryObj<typeof VsHeader>;

export const Default: Story = {};
