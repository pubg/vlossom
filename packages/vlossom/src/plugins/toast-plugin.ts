import { render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastOptions } from '@/declaration';

function attach() {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }

    if (document.querySelector('.vs-toast-view')) {
        return;
    }
    const toastView = h(VsToastView);
    render(toastView, document.body);
}

function toastBody(
    text: string,
    {
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
        colorScheme,
    }: ToastOptions,
    state?: Exclude<UIState, UIState.Idle | UIState.Selected>,
) {
    return {
        id: utils.string.createID(),
        state,
        text,
        autoClose,
        duration: timeout,
        placement,
        align,
        colorScheme,
    };
}

export const toast: ToastPlugin = {
    show(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
    },
    success(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(text, toastOptions ?? {}, UIState.Success);
        store.toastStore.addToast(toastInfo);
        attach();
    },
    info(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(text, toastOptions ?? {}, UIState.Info);
        store.toastStore.addToast(toastInfo);
        attach();
    },
    error(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(text, toastOptions ?? {}, UIState.Error);
        store.toastStore.addToast(toastInfo);
        attach();
        console.error(text);
    },
    warn(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(text, toastOptions ?? {}, UIState.Warning);
        store.toastStore.addToast(toastInfo);
        attach();
        console.warn(text);
    },
};
