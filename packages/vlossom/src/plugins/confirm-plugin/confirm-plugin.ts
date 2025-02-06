import { Component, h } from 'vue';
import { ConfirmPlugin } from './types';
import { VsConfirm, type ConfirmOptions } from '@/components';
import { VS_CONFIRM_CANCEL, VS_CONFIRM_OK } from '@/declaration';
import { modalPlugin } from '@/plugins';
import { useContentRenderer } from '@/composables';

export const confirmPlugin: ConfirmPlugin = {
    open: (content: string | Component, confirmOptions: ConfirmOptions = {}): Promise<boolean> => {
        return new Promise((resolve) => {
            const { okText, cancelText, size = 'xs', callbacks = {}, styleSet } = confirmOptions;
            const { getRenderedContent } = useContentRenderer();
            const modalId = modalPlugin.open({
                ...confirmOptions,
                component: h(
                    VsConfirm,
                    { okText, cancelText, styleSet },
                    {
                        default: () => {
                            return getRenderedContent(content);
                        },
                    },
                ),
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
    prompt(content: string, confirmText: string /*promptOptions: PromptOptions = {}*/) {
        const promptText = window.prompt(content);
        return new Promise((resolve) => {
            resolve(promptText === confirmText);
        });
    },
};
