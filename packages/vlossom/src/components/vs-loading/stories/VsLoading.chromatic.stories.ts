import { colorScheme } from '@/storybook';
import VsLoading from './../VsLoading.vue';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsLoading> = {
    title: 'Chromatic/Base Components/VsLoading',
    component: VsLoading,
    render: (args: any) => ({
        components: { VsLoading },
        setup() {
            return { args };
        },
        template: '<vs-loading v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        colorScheme,
    },
};

export default meta;
type Story = StoryObj<typeof VsLoading>;

export const Default: Story = {};
