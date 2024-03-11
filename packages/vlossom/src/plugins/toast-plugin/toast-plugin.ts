import { render, h } from 'vue';
import { store } from '@/store';
import { utils } from '@/utils';
import { UIState } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastInfo, ToastOptions, ToastPlugin } from './types';
import type { Placement, Align } from '@/declaration';

function attach(placement: Exclude<Placement, 'left' | 'right'>, align: Align) {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }

    const targetId = `vs-toast-view-${placement}-${align}`;

    if (!document.getElementById(targetId)) {
        const toastView = h(VsToastView, { placement, align });
        const toastViewRoot = document.createElement('div');
        toastViewRoot.setAttribute('id', targetId);
        render(toastView, toastViewRoot);
        document.body.appendChild(toastViewRoot);
    }
}

export const DEFAULT_TOAST_TIMEOUT = 3000;

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
): ToastInfo {
    const toastInfo = {
        id: utils.string.createID(),
        state,
        text,
        autoClose,
        placement,
        align,
        colorScheme,
    };

    if (!autoClose) {
        return toastInfo;
    }

    return {
        ...toastInfo,
        duration: timeout,
    };
}

export const toastPlugin: ToastPlugin = {
    show(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions);
        store.toast.addToast(toastInfo);
        attach(toastInfo.placement, toastInfo.align);
    },
    success(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Success);
        store.toast.addToast(toastInfo);
        attach(toastInfo.placement, toastInfo.align);
    },
    info(text: string, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Info);
        store.toast.addToast(toastInfo);
        attach(toastInfo.placement, toastInfo.align);
    },
    error(text: any, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Error);
        store.toast.addToast(toastInfo);
        attach(toastInfo.placement, toastInfo.align);
        console.error(text);
    },
    warn(text: any, toastOptions?: ToastOptions) {
        const toastInfo = getToastInfo(text, toastOptions, UIState.Warning);
        store.toast.addToast(toastInfo);
        attach(toastInfo.placement, toastInfo.align);
        console.warn(text);
    },
};
