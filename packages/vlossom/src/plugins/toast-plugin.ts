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
    state: UIState,
    text: string,
    {
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
        colorScheme,
    }: ToastOptions,
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
    success(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Success, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
    },
    info(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Info, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
    },
    error(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Error, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
        console.error(text);
    },
    warn(text: string, toastOptions: ToastOptions) {
        const toastInfo = toastBody(UIState.Warning, text, toastOptions ?? {});
        store.toastStore.addToast(toastInfo);
        attach();
        console.warn(text);
    },
};
