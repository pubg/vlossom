import VsToast from '@/components/vs-toast/VsToast.vue';

import { getMetaArguments } from '@/storybook';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsToast> = {
    title: 'Components/Base Components/VsToast',
    component: VsToast,
    render: (args: any) => ({
        components: { VsToast },
        setup() {
            return { args };
        },
        template: '<vs-toast v-bind="args">Toast</vs-toast>',
    }),
    tags: ['autodocs'],
    args: {
        toast: {
            id: '1',
            content: 'Toast',
        },
    },
    argTypes: {
        toast: {},
    },
};

meta.args = getMetaArguments(VsToast.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsToast>;

export const Default: Story = {};
