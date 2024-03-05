import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, ToastPlugin, DEFAULT_TOAST_TIMEOUT } from '@/declaration';

export const toast: ToastPlugin = {
    info(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toast.addToast({
            id: utils.string.createID(),
            text,
            state: UIState.Info,
            duration: timeout,
        });
    },
    success(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toast.addToast({
            id: utils.string.createID(),
            text,
            state: UIState.Success,
            duration: timeout,
        });
    },
    warn(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toast.addToast({
            id: utils.string.createID(),
            text,
            state: UIState.Warning,
            duration: timeout,
        });
        console.warn(text);
    },
    error(text: any, timeout: number = DEFAULT_TOAST_TIMEOUT) {
        store.toast.addToast({
            id: utils.string.createID(),
            text,
            state: UIState.Error,
            duration: timeout,
        });
        console.error(text);
    },
};
