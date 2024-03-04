import { store } from '@/store';
import { utils } from '@/utils';
import { UIState, SnackbarPlugin, DEFAULT_SNACKBAR_TIMEOUT } from '@/declaration';

export const snackbar: SnackbarPlugin = {
    info(text: any, timeout: number = DEFAULT_SNACKBAR_TIMEOUT) {
        store.snackbar.addSnackbar({
            id: utils.string.createID(),
            text,
            state: UIState.Info,
            duration: timeout,
        });
    },
    success(text: any, timeout: number = DEFAULT_SNACKBAR_TIMEOUT) {
        store.snackbar.addSnackbar({
            id: utils.string.createID(),
            text,
            state: UIState.Success,
            duration: timeout,
        });
    },
    warn(text: any, timeout: number = DEFAULT_SNACKBAR_TIMEOUT) {
        store.snackbar.addSnackbar({
            id: utils.string.createID(),
            text,
            state: UIState.Warning,
            duration: timeout,
        });
        console.warn(text);
    },
    error(text: any, timeout: number = DEFAULT_SNACKBAR_TIMEOUT) {
        store.snackbar.addSnackbar({
            id: utils.string.createID(),
            text,
            state: UIState.Error,
            duration: timeout,
        });
        console.error(text);
    },
};
