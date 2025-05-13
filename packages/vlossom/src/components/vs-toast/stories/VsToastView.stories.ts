import VsToastView from '@/components/vs-toast/VsToastView.vue';
import { getMetaArguments } from '@/storybook';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsToastView> = {
    title: 'Components/Base Components/VsToastView',
    component: VsToastView,
    render: (args: any) => ({
        components: { VsToastView },
        setup() {
            return { args };
        },
        template: '<vs-toast-view v-bind="args" />',
    }),
    tags: ['autodocs'],
    argTypes: {
        container: {
            control: 'text',
        },
    },
};

meta.args = getMetaArguments(VsToastView.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsToastView>;

export const Default: Story = {};
