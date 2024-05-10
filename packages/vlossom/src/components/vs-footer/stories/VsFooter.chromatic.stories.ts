import { colorScheme, align, cssPosition, LOREM_IPSUM } from '@/storybook';
import VsFooter from './../VsFooter.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsFooter> = {
    title: 'Chromatic/Layout Components/VsFooter',
    component: VsFooter,
    render: (args: any) => ({
        components: { VsFooter },
        setup() {
            return { args };
        },
        template: `
            <div>
                <div style="height:200px; background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <div style="padding-bottom:50px;">${LOREM_IPSUM}</div>
                    <vs-footer height="80px" v-bind="args" verticalAlign="start"> This is Footer Content </vs-footer>
                </div>

                <div style="height:200px; background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <div style="padding-bottom:50px;">${LOREM_IPSUM}</div>
                    <vs-footer height="80px" v-bind="args"> This is Footer Content </vs-footer>
                </div>

                <div style="height:200px; background-color:#fff; position: relative; width: 100%; margin-bottom: 12px;">
                    <div style="padding-bottom:50px;">${LOREM_IPSUM}</div>
                    <vs-footer height="80px" v-bind="args" verticalAlign="end"> This is Footer Content </vs-footer>
                </div>

                <div style="height:200px; background-color:#fff; position: relative; width: 100%">
                    <div style="padding-bottom:50px;">${LOREM_IPSUM}</div>
                    <vs-footer primary height="80px" v-bind="args"> This is Footer Content </vs-footer>
                </div>
            </div>`,
    }),
    tags: ['autodocs'],
    args: {
        height: '50px',
        position: 'absolute',
    },
    argTypes: {
        colorScheme,
        verticalAlign: align,
        position: cssPosition,
    },
};
export default meta;
type Story = StoryObj<typeof VsFooter>;

export const Default: Story = {};
