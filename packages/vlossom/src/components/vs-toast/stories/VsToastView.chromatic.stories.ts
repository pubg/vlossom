import VsToastView from '@/components/vs-toast/VsToastView.vue';
import { store } from '@/stores';
import { getMetaArguments } from '@/storybook';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof VsToastView> = {
    title: 'Chromatic/Base Components/VsToastView',
    component: VsToastView,
    render: (args: any) => ({
        components: { VsToastView },
        setup() {
            store.toast.clear();
            store.toast.push({
                id: '1',
                content: 'First Toast',
                placement: 'top',
                align: 'center',
            });
            return { args };
        },
        template: '<vs-toast-view v-bind="args" />',
    }),
    args: {
        container: 'body',
    },
};

meta.args = getMetaArguments(VsToastView.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsToastView>;

export const Default: Story = {};
