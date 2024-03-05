import { createVNode, render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

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

function toastInfo(state: UIState, text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
    return {
        id: utils.string.createID(),
        text,
        state,
        duration: timeout,
    };
}

export const toast: ToastPlugin = {
    success(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toastStore.addToast(toastInfo(UIState.Success, text, timeout));
        attach();
    },
    info(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toastStore.addToast(toastInfo(UIState.Info, text, timeout));
        attach();
    },
    error(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toastStore.addToast(toastInfo(UIState.Error, text, timeout));
        attach();
        console.error(text);
    },
    warn(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toastStore.addToast(toastInfo(UIState.Warning, text, timeout));

        attach();
        console.warn(text);
    },
};
