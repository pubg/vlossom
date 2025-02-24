import { Component, h, render } from 'vue';
import { store } from '@/stores';
import { getToastInfo } from '@/models';
import { utils } from '@/utils';
import { DEFAULT_TOAST_TIMEOUT } from '@/declaration';
import { getApp } from '@/vlossom-framework';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastPlugin } from './types';
import type { VsToastInfo, VsToastOptions } from '@/components/vs-toast/types';
import { useOverlayDom } from '@/composables';

function renderToastView(toastInfo: VsToastInfo) {
    const { container = 'body' } = toastInfo;
    const containerElement = document.querySelector(container);
    if (!containerElement) {
        utils.log.error('toast', `container not found: ${container}`);
        return '';
    }

    store.toast.push(toastInfo);
    if (toastInfo.autoClose) {
        setTimeout(() => {
            store.toast.remove(toastInfo.id);
        }, toastInfo.timeout || DEFAULT_TOAST_TIMEOUT);
    }

    const { appendOverlayDom } = useOverlayDom();
    const overlay = appendOverlayDom(containerElement, `vs-toast-overlay-${container.replace('#', '')}`, {
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3000,
    });

    const toastView = h(VsToastView, { container });
    toastView.appContext = getApp()._context;
    render(toastView, overlay);
}

export const toastPlugin: ToastPlugin = {
    show(content: string | Component, options?: Omit<VsToastOptions, 'logger'>) {
        const toastInfo = getToastInfo(content, 'idle', options);
        renderToastView(toastInfo);
    },
    success(content: string | Component, options?: Omit<VsToastOptions, 'logger'>) {
        const toastInfo = getToastInfo(content, 'success', options);
        renderToastView(toastInfo);
    },
    info(content: string | Component, options?: Omit<VsToastOptions, 'logger'>) {
        const toastInfo = getToastInfo(content, 'info', options);
        renderToastView(toastInfo);
    },
    warn(content: string, options?: VsToastOptions) {
        const toastInfo = getToastInfo(content, 'warning', options);
        renderToastView(toastInfo);

        const logStr = options?.logger ? options.logger(content) : content;
        console.warn(logStr);
    },
    error(content: string | Component | Error, options?: VsToastOptions) {
        let message: string | Component = '';

        if (content instanceof Error) {
            message = content.message;
        } else {
            message = content;
        }

        const toastInfo = getToastInfo(message, 'error', options);
        renderToastView(toastInfo);

        const logStr = options?.logger ? options.logger(content) : content;
        console.error(logStr);
    },
};
