import { store } from '@/stores';
import { utils } from '@/utils';
import { UIState } from '@/declaration';

import type { ToastInfo, ToastOptions, ToastPlugin } from './types';

function getToastInfo(content: string, state: Exclude<UIState, 'selected'>, options: ToastOptions = {}): ToastInfo {
    let stateColor = options.colorScheme;
    switch (state) {
        case 'success':
            stateColor = 'green';
            break;
        case 'info':
            stateColor = 'light-blue';
            break;
        case 'error':
            stateColor = 'red';
            break;
        case 'warning':
            stateColor = 'orange';
            break;
        default:
            break;
    }

    return {
        id: utils.string.createID(),
        content,
        colorScheme: stateColor,
        autoClose: true,
        ...options,
        ...(options.timeout ? { autoClose: true } : {}),
    };
}

export const toastPlugin: ToastPlugin = {
    show(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, 'idle', options);
        store.toast.addToast(toastInfo);
    },
    success(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, 'success', options);
        store.toast.addToast(toastInfo);
    },
    info(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, 'info', options);
        store.toast.addToast(toastInfo);
    },
    error(content: string | Error, options?: ToastOptions) {
        let message = '';

        if (content instanceof Error) {
            message = content.message;
        } else {
            message = content;
        }

        const toastInfo = getToastInfo(message, 'error', options);
        store.toast.addToast(toastInfo);
        console.error(content);
    },
    warn(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, 'warning', options);
        store.toast.addToast(toastInfo);
        console.warn(content);
    },
};
