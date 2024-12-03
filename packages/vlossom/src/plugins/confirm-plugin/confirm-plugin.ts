import { h } from 'vue';
import { ConfirmPlugin } from './types';
// import { VsInput } from '@/components';
import { VsConfirmation, VsPrompt, type ConfirmOptions, type PromptOptions } from '@/nodes';
import { VS_CONFIRM_CANCEL, VS_CONFIRM_OK } from '@/declaration';
import { modalPlugin } from '@/plugins';
import { useSlotContent } from '@/composables';

export const confirmPlugin: ConfirmPlugin = {
    open: (content: string, confirmOptions: ConfirmOptions = {}): Promise<boolean> => {
        return new Promise((resolve) => {
            const { okText, cancelText, size = 'xs', callbacks = {} } = confirmOptions;
            const { getSlotContent } = useSlotContent();
            const modalId = modalPlugin.open({
                ...confirmOptions,
                component: h(VsConfirmation, { okText, cancelText }, { default: () => getSlotContent(content) }),
                size,
                callbacks: {
                    ...callbacks,
                    [VS_CONFIRM_OK]: () => {
                        resolve(true);
                        modalPlugin.closeWithId(modalId);
                    },
                    [VS_CONFIRM_CANCEL]: () => {
                        resolve(false);
                        modalPlugin.closeWithId(modalId);
                    },
                    'key-Enter': () => {
                        resolve(true);
                        modalPlugin.closeWithId(modalId);
                    },
                    'key-Escape': () => {
                        resolve(false);
                        modalPlugin.closeWithId(modalId);
                    },
                },
            });
        });
    },
    prompt(content: string, confirmText: string, promptOptions: PromptOptions = {}) {
        const promptText = window.prompt(text);

        return new Promise((resolve) => {
            resolve(promptText === confirmText);
        });
    },
};
