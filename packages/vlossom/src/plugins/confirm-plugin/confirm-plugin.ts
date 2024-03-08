import { render, h } from 'vue';
import { store } from '@/store';
import VsConfirm from '@/components/vs-confirm/VsConfirm.vue';

import type { ConfirmInfo, ConfirmOptions, ConfirmPlugin } from './types';

export function attachConfirm(confirmInfo: ConfirmInfo) {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }

    if (!document.getElementById('vs-confirm')) {
        const toastView = h(VsConfirm, { confirmInfo });
        const toastViewRoot = document.createElement('div');
        render(toastView, toastViewRoot);
        toastViewRoot.setAttribute('id', 'vs-confirm');
        document.body.appendChild(toastViewRoot);
    }
}

export function detachConfirm() {
    const target = document.getElementById('vs-confirm');
    if (target) {
        document.body.removeChild(target);
    }
}

export const confirmPlugin: ConfirmPlugin = {
    open: (text: string, confirmOptions?: ConfirmOptions): Promise<boolean> => {
        attachConfirm({ text, ...confirmOptions });

        return new Promise((resolve) => {
            store.confirm.setResolve(resolve);
        });
    },
    prompt(text: string, confirmText: string) {
        const promptText = window.prompt(text);

        return new Promise((resolve) => {
            resolve(promptText === confirmText);
        });
    },
};
