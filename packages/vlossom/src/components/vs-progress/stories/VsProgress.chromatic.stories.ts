import { colorScheme } from '@/storybook';
import VsProgress from './../VsProgress.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsProgress> = {
    title: 'Chromatic/Base Components/VsProgress',
    component: VsProgress,
    render: (args: any) => ({
        components: { VsProgress },
        setup() {
            return { args };
        },
        template: `
            <div style="display:flex; flex-direction:column;">
                <vs-progress v-bind="args"/>
            </div>`,
    }),
    tags: ['autodocs'],
    args: {
        value: 50,
        max: 100,
    },
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsProgress>;

export const Default: Story = {};
