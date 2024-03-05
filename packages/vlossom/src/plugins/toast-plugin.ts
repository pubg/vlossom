import { render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT, Placement, Align } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';
import type { ToastParams } from '@/declaration';

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

function toastInfo({
    text,
    state,
    autoClose = true,
    timeout = DEFAULT_TOAST_TIMEOUT,
    placement = 'top',
    align = 'center',
}: ToastParams & { state: UIState }) {
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
    success({ text, autoClose, timeout, placement, align }: ToastParams) {
        store.toastStore.addToast(toastInfo({ text, state: UIState.Success, autoClose, timeout, placement, align }));
        attach(placement);
    },
    info({
        text,
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
    }: ToastParams) {
        store.toastStore.addToast(toastInfo({ text, state: UIState.Info, autoClose, timeout, placement, align }));
        attach(placement);
    },
    error({
        text,
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
    }: ToastParams) {
        store.toastStore.addToast(toastInfo({ text, state: UIState.Error, autoClose, timeout, placement, align }));
        attach(placement);
        console.error(text);
    },
    warn({
        text,
        autoClose = true,
        timeout = DEFAULT_TOAST_TIMEOUT,
        placement = 'top',
        align = 'center',
    }: ToastParams) {
        store.toastStore.addToast(toastInfo({ text, state: UIState.Warning, autoClose, timeout, placement, align }));

        attach(placement);
        console.warn(text);
    },
};
