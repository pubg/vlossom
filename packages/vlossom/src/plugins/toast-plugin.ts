import { render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT, Placement, Align } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';
import type { ToastOptions } from '@/declaration';

function attach(placement: Placement = 'top') {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }

    const containerId = `vs-toast-view-${placement}`;
    if (document.getElementById(containerId)) {
        return;
    }
    const toastView = h(VsToastView);
    render(toastView, document.body);
}

function toastBody(
    state: UIState,
    text: any,
    { autoClose = true, timeout = DEFAULT_TOAST_TIMEOUT, placement = 'top', align = 'start' }: ToastOptions,
) {
    return {
        id: utils.string.createID(),
        state,
        text,
        autoClose,
        duration: timeout,
        placement,
        align,
    };
}

export const toast: ToastPlugin = {
    success(text: any, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Success, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
    },
    info(text: any, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Info, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
    },
    error(text: any, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Error, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
        console.error(text);
    },
    warn(text: any, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Warning, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
        console.warn(text);
    },
};
