import { chromaticParameters, getColorSchemeTemplate, getMetaArguments } from '@/storybook';
import type { Meta, StoryObj } from '@storybook/vue3';

import { store } from '@/stores';
import { VsButton, VsToast, VsToastInfo, VsToastView } from '@/components';
import { toastPlugin } from '@/plugins';
import { toRefs, watch } from 'vue';

const meta: Meta<typeof VsToast> = {
    title: 'Components/Base Components/VsToast',
    component: VsToast,
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast, VsToastView },
        setup() {
            const { toast } = toRefs(args);
            initializeToast();

            function initializeToast() {
                store.toast.remove(toast.value.id);
                store.toast.push(toast.value);
            }
            watch(toast, initializeToast);

            return { toast };
        },
        template: `
            <div style="position: relative; height: 10rem;">
                <vs-toast-view container="#custom" />
            </div>
        `,
    }),
    tags: ['autodocs'],
    args: {
        toast: {
            id: '1',
            content: 'Toast',
            container: '#custom',
            colorScheme: 'none',
            styleSet: '',
            align: 'start',
            autoClose: false,
            placement: 'top',
            primary: false,
        },
    },
    argTypes: {
        toast: {
            control: 'object',
            description: 'Toast configuration object',
            table: {
                type: { summary: 'VsToastInfo' },
            },
        },
    },
};

meta.args = getMetaArguments(VsToast.props, meta.args);
export default meta;
type Story = StoryObj<typeof VsToast>;

export const Default: Story = {};

export const ColorScheme: Story = {
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast },
        setup() {
            return { args };
        },
        template: `
            <div>
                ${getColorSchemeTemplate(`
                    <vs-toast v-bind="{ toast: {...args.toast, colorScheme: '{{ color }}' } }" />
                `)}
            </div>
        `,
    }),
    parameters: {
        chromatic: chromaticParameters.theme,
    },
};

export const Primary: Story = {
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast },
        setup() {
            store.toast.remove(args.toast.id);
            store.toast.push({ ...args.toast, primary: true });
            store.toast.push({ ...args.toast, primary: false });
        },
        template: `
            <div style="position: relative; height: 10rem;">
                <vs-toast-view container="#primary-toast-view" />
            </div>
        `,
    }),
    args: {
        toast: {
            container: '#primary-toast-view',
            id: 'toast-primary',
            content: 'primary Option Toast',
        },
    },
};

export const Align: Story = {
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast },
        setup() {
            store.toast.remove(args.toast.id);
            store.toast.push({ ...args.toast, content: 'align start', align: 'start' });
            store.toast.push({ ...args.toast, content: 'align center', align: 'center' });
            store.toast.push({ ...args.toast, content: 'align end', align: 'end' });
        },
        template: `
            <div style="position: relative; height: 20rem; border: 1px solid black;">
                <vs-toast-view container="#align-toast-view" />
            </div>
        `,
    }),
    args: {
        toast: {
            container: '#align-toast-view',
            id: 'toast-align',
            content: 'Toast',
        },
    },
};

export const Placement: Story = {
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast },
        setup() {
            store.toast.remove(args.toast.id);
            store.toast.push({ ...args.toast, content: 'placement top', placement: 'top' });
            store.toast.push({ ...args.toast, content: 'placement middle', placement: 'middle' });
            store.toast.push({ ...args.toast, content: 'placement bottom', placement: 'bottom' });
        },
        template: `
            <div style="position: relative; height: 20rem; border: 1px solid black;">
                <vs-toast-view container="#placement-toast-view" />
            </div>
        `,
    }),
    args: {
        toast: {
            container: '#placement-toast-view',
            id: 'toast-placement',
            content: 'Toast',
        },
    },
};

export const AutoClose: Story = {
    render: (args: { toast: VsToastInfo }) => ({
        components: { VsToast, VsButton },
        setup() {
            function showToast() {
                toastPlugin.show('autoClose false', { ...args.toast, autoClose: false });
                toastPlugin.show('autoClose true ', { ...args.toast });
                toastPlugin.show('autoClose true , timeout 4000', { ...args.toast, timeout: 4000 });
                toastPlugin.show('autoClose true , timeout 4500', { ...args.toast, timeout: 4500 });
                toastPlugin.show('autoClose true , timeout 5000', { ...args.toast, autoClose: true, timeout: 5000 });
                toastPlugin.show('autoClose false, timeout 6000', { ...args.toast, autoClose: false, timeout: 6000 });
            }

            return { showToast };
        },
        template: `
            <vs-button @click="showToast">show toast</vs-button>

            <div style="position: relative; height: 50rem; ">
                <vs-toast-view container='#auto-close-toast-view' />
            </div>
        `,
    }),
    args: {
        toast: {
            container: '#auto-close-toast-view',
            id: 'toast-auto-close',
        } as VsToastInfo,
    },
};
