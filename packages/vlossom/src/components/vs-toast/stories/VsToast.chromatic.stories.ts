import type { Meta, StoryObj } from '@storybook/vue3';
import { VsToastView, VsToast } from '@/components';
import { store } from '@/stores';
import { toastPlugin } from '@/plugins';

const meta: Meta<typeof VsToast> = {
    title: 'Chromatic/Base Components/VsToast',
    component: VsToast,
    render: (args: any) => ({
        components: { VsToast, VsToastView },
        setup() {
            // VsToastView, container='#toast-view'
            const contents = [
                { placement: 'top', align: 'start' },
                { placement: 'top', align: 'center' },
                { placement: 'top', align: 'end' },
                { placement: 'middle', align: 'start' },
                { placement: 'middle', align: 'center' },
                { placement: 'middle', align: 'end' },
                { placement: 'bottom', align: 'start' },
                { placement: 'bottom', align: 'center' },
                { placement: 'bottom', align: 'end' },
            ] as const;
            contents.forEach(({ placement, align }) => {
                store.toast.remove(`${placement}-${align}`);
                store.toast.push({
                    container: '#toast-view',
                    id: `${placement}-${align}`,
                    content: `${placement}-${align}`,
                    placement,
                    align,
                });
            });

            // toastPlugin, container='#body'
            toastPlugin.show('toast plugin show', { timeout: 500 });
            toastPlugin.info('toast plugin info', { timeout: 1000 });
            toastPlugin.success('toast plugin success', { timeout: 1500 });
            toastPlugin.warn('toast plugin warn', { timeout: 2000 });
            toastPlugin.error('toast plugin error', { timeout: 2500 });

            return { args };
        },

        template: `
            <div style="display: flex; flex-direction: column; gap: 5rem;">
                <div style="display: flex; flex-direction: column; height: 25rem;">
                    <vs-toast v-bind="{ toast: args.toast }" />

                    <vs-toast v-bind="{ toast: {...args.toast, colorScheme: 'gray', content: 'Gray Toast' } }" />

                    <vs-toast v-bind="{ toast: {...args.toast, primary: true, content: 'Primary Toast' } }" />

                    <vs-toast v-bind="{ toast: {...args.toast, autoClose: true, content: 'auto close toast' } }" />

                    <vs-toast v-bind="{ toast: {...args.toast, content: 'Long Long Long Text Toast Content' } }" />
                </div>

                <div style="position: relative; height: 20rem; ">
                    <vs-toast-view container="#toast-view" />
                </div>

                <vs-toast-view container="#body" />
            </div>
        `,
    }),
    args: {
        toast: {
            id: 'toast-1',
            content: 'Toast',
        },
    },
};

export default meta;
type Story = StoryObj<typeof VsToast>;

export const Default: Story = {};
