import { render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastOptions } from '@/declaration';

export function attach() {
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

export function getToastInfo(
    text: string,
    {
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
        colorScheme,
    }: ToastOptions = {},
    state?: Exclude<UIState, UIState.Idle | UIState.Selected>,
) {
    const toastInfo = {
        id: utils.string.createID(),
        state,
        text,
        autoClose,
        placement,
        align,
        colorScheme,
    };

    if (autoClose) {
        return toastInfo;
    }

    return {
        ...toastInfo,
        duration: timeout,
    };
}

export const toast: ToastPlugin = {
    show(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions);
        store.toast.addToast(toastInfo);
        attach();
    },
    success(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Success);
        store.toast.addToast(toastInfo);
        attach();
    },
    info(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Info);
        store.toast.addToast(toastInfo);
        attach();
    },
    error(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Error);
        store.toast.addToast(toastInfo);
        attach();
        console.error(text);
    },
    warn(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Warning);
        store.toast.addToast(toastInfo);
        attach();
        console.warn(text);
    },
};
