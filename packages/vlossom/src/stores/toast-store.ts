import { reactive } from 'vue';
import type { ToastInfo } from '@/plugins';

interface ToastState {
    toasts: ToastInfo[];
}

export class ToastStore {
    private state: ToastState = reactive({
        toasts: [],
    });

    getState() {
        return this.state;
    }

    get toasts() {
        return this.state.toasts;
    }

    addToast(toastInfo: ToastInfo) {
        this.state.toasts.unshift(toastInfo);
        if (toastInfo.autoClose) {
            setTimeout(() => {
                this.removeToast(toastInfo.id);
            }, toastInfo.duration);
        }
    }

    removeToast(targetId: string) {
        const index = this.state.toasts.findIndex((snackbar: ToastInfo) => snackbar.id === targetId);
        if (index !== -1) {
            this.state.toasts.splice(index, 1);
        }
    }

    clearAll() {
        this.state.toasts = [];
    }
}
