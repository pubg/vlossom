import { createVNode, render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT, Placement, Align } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';
import { Placement } from '@/components/vs-drawer/stories/VsDrawer.stories';

function attach() {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }
    if (document.getElementById('vs-toast-view')) {
        return;
    }
    const toastView = createVNode(VsToastView);
    render(toastView, document.body);
}

function toastInfo(
    text: any,
    state: UIState,
    autoClose: boolean = true,
    timeout: number = DEFAULT_TOAST_TIMEOUT,
    placement: Placement = 'top',
    align: Align = 'center',
) {
    return {
        id: utils.string.createID(),
        text,
        state,
        autoClose,
        duration: timeout,
        placement,
        align,
    };
}

export const toast: ToastPlugin = {
    success(
        text: any,
        autoClose: boolean = true,
        timeout: number = DEFAULT_TOAST_TIMEOUT,
        placement: Placement = 'top',
        align: Align = 'center',
    ) {
        store.toastStore.addToast(toastInfo(text, UIState.Success, autoClose, timeout, placement, align));
        attach();
    },
    info(
        text: any,
        autoClose: boolean = true,
        timeout: number = DEFAULT_TOAST_TIMEOUT,
        placement: Placement = 'top',
        align: Align = 'center',
    ) {
        store.toastStore.addToast(toastInfo(text, UIState.Info, autoClose, timeout, placement, align));
        attach();
    },
    error(
        text: any,
        autoClose: boolean = true,
        timeout: number = DEFAULT_TOAST_TIMEOUT,
        placement: Placement = 'top',
        align: Align = 'center',
    ) {
        store.toastStore.addToast(toastInfo(text, UIState.Error, autoClose, timeout, placement, align));
        attach();
        console.error(text);
    },
    warn(
        text: any,
        autoClose: boolean = true,
        timeout: number = DEFAULT_TOAST_TIMEOUT,
        placement: Placement = 'top',
        align: Align = 'center',
    ) {
        store.toastStore.addToast(toastInfo(text, UIState.Warning, autoClose, timeout, placement, align));

        attach();
        console.warn(text);
    },
};
