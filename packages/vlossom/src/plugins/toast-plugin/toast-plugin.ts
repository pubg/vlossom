import { store } from '@/stores';
import { utils } from '@/utils';
import { UIState } from '@/declaration';

import type { ToastInfo, ToastOptions, ToastPlugin } from './types';

function getToastInfo(
    content: string,
    state: Exclude<UIState, UIState.Selected>,
    options: ToastOptions = {},
): ToastInfo {
    let stateColor = options.colorScheme;
    switch (state) {
        case UIState.Success:
            stateColor = 'green';
            break;
        case UIState.Info:
            stateColor = 'light-blue';
            break;
        case UIState.Error:
            stateColor = 'red';
            break;
        case UIState.Warning:
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
        const toastInfo = getToastInfo(content, UIState.Idle, options);
        store.toast.addToast(toastInfo);
    },
    success(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, UIState.Success, options);
        store.toast.addToast(toastInfo);
    },
    info(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, UIState.Info, options);
        store.toast.addToast(toastInfo);
    },
    error(content: string | Error, options?: ToastOptions) {
        let message = '';

        if (content instanceof Error) {
            message = content.message;
        } else {
            message = content;
        }

        const toastInfo = getToastInfo(message, UIState.Error, options);
        store.toast.addToast(toastInfo);
        console.error(content);
    },
    warn(content: string, options?: ToastOptions) {
        const toastInfo = getToastInfo(content, UIState.Warning, options);
        store.toast.addToast(toastInfo);
        console.warn(content);
    },
};
