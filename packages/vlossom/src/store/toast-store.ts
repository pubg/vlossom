import { reactive } from 'vue';
import { ToastInfo } from '..';

interface ToastState {
    snackbars: ToastInfo[];
}

export class ToastStore {
    private state: ToastState = reactive({
        snackbars: [],
    });

    getState() {
        return this.state;
    }

    addToast(toastInfo: ToastInfo) {
        console.log(222222, 'added toast!');
        this.state.snackbars.unshift(toastInfo);

        setTimeout(() => {
            const index = this.state.snackbars.findIndex((snackbar: ToastInfo) => snackbar.id === toastInfo.id);
            if (index !== -1) {
                this.removeToast(index);
            }
        }, toastInfo.duration);
    }

    removeToast(index: number) {
        this.state.snackbars.splice(index, 1);
    }
}
