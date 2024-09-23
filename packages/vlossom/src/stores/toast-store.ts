import { reactive, h, render } from 'vue';
import { utils } from '@/utils';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastInfo } from '@/plugins';
import type { Placement, Align } from '@/declaration';

interface ToastState {
    toasts: ToastInfo[];
}

const DEFAULT_TOAST_TIMEOUT = 3000;

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

    private attachToastView(placement: Exclude<Placement, 'left' | 'right'> = 'top', align: Align = 'center') {
        const body = document?.body;
        if (!body) {
            utils.log.error('vs-toast', 'body not found');
            return;
        }

        const targetId = `vs-toast-view-${placement}-${align}`;
        if (document.getElementById(targetId)) {
            return;
        }

        const toastView = h(VsToastView, { placement, align });
        const toastViewRoot = document.createElement('div');
        toastViewRoot.setAttribute('id', targetId);
        render(toastView, toastViewRoot);
        document.body.appendChild(toastViewRoot);
    }

    private detachToastView(placement: Exclude<Placement, 'left' | 'right'> = 'top', align: Align = 'center') {
        const targetId = `vs-toast-view-${placement}-${align}`;
        const target = document.getElementById(targetId);
        if (target) {
            setTimeout(() => {
                target.remove();
            }, 500);
        }
    }

    addToast(toastInfo: ToastInfo) {
        this.attachToastView(toastInfo.placement, toastInfo.align);
        this.state.toasts.unshift(toastInfo);
        if (toastInfo.autoClose) {
            setTimeout(() => {
                this.removeToast(toastInfo);
            }, toastInfo.timeout || DEFAULT_TOAST_TIMEOUT);
        }
    }

    removeToast(toastInfo: ToastInfo) {
        const index = this.state.toasts.findIndex((snackbar: ToastInfo) => snackbar.id === toastInfo.id);
        if (index !== -1) {
            this.state.toasts.splice(index, 1);
        }

        const filteredToasts = this.state.toasts.filter(
            (toast) => toast.placement === toastInfo.placement && toast.align === toastInfo.align,
        );
        if (filteredToasts.length === 0) {
            this.detachToastView(toastInfo.placement, toastInfo.align);
        }
    }

    removeToastById(id: string) {
        const toastInfo = this.state.toasts.find((toast) => toast.id === id);
        if (toastInfo) {
            this.removeToast(toastInfo);
        }
    }

    clearAll() {
        this.state.toasts = [];
    }
}
