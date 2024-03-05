import { reactive } from 'vue';
import { ToastInfo } from '..';

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
        console.log(222222, 'added toast!');
        this.state.toasts.unshift(toastInfo);

        setTimeout(() => {
            const index = this.state.toasts.findIndex((snackbar: ToastInfo) => snackbar.id === toastInfo.id);
            if (index !== -1) {
                this.removeToast(index);
            }
        }, toastInfo.duration);
    }

    removeToast(index: number) {
        this.state.toasts.splice(index, 1);
    }
}
