import { render, h } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import VsConfirm from '@/components/vs-confirm/VsConfirm.vue';

import type { ConfirmOptions, ConfirmPlugin } from './types';

function renderConfirm(text: string, confirmOptions: ConfirmOptions) {
    const body = document?.body;
    if (!body) {
        utils.log.error('vs-confirm', 'body not found');
        return;
    }

    const confirmView = h(VsConfirm, { text, ...confirmOptions });
    const confirmViewRoot = document.createElement('div');
    render(confirmView, confirmViewRoot);
}

export const confirmPlugin: ConfirmPlugin = {
    open: (text: string, confirmOptions: ConfirmOptions = {}): Promise<boolean> => {
        renderConfirm(text, confirmOptions);

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
