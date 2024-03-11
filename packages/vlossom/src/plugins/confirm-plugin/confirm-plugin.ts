import { render, h } from 'vue';
import { store } from '@/store';
import VsConfirm from '@/components/vs-confirm/VsConfirm.vue';

import type { ConfirmInfo, ConfirmOptions, ConfirmPlugin } from './types';

function renderConfirm(confirmInfo: ConfirmInfo) {
    const body = document?.body;
    if (!body) {
        console.error('body not found');
        return;
    }

    const confirmView = h(VsConfirm, { confirmInfo });
    const confirmViewRoot = document.createElement('div');
    render(confirmView, confirmViewRoot);
}

export const confirmPlugin: ConfirmPlugin = {
    open: (text: string, confirmOptions?: ConfirmOptions): Promise<boolean> => {
        renderConfirm({ text, ...confirmOptions });

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
