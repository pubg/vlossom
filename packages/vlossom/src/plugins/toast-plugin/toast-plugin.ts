import { Component, h, render } from 'vue';
import { store } from '@/stores';
import { getToastInfo } from '@/models';
import { utils } from '@/utils';
import { DEFAULT_TOAST_TIMEOUT } from '@/declaration';
import VsToastView from '@/components/vs-toast/VsToastView.vue';

import type { ToastPlugin } from './types';
import type { VsToastInfo, VsToastOptions } from '@/components/vs-toast/types';

function renderToastView(toastInfo: VsToastInfo) {
    const { container = 'body' } = toastInfo;
    const containerElement = document.querySelector(container);
    if (!containerElement) {
        utils.log.error('toast', `container not found: ${container}`);
        return '';
    }

    const wrapperId = `vs-toast-${container.replace('#', '')}`;
    let toastWrap = document.getElementById(wrapperId);
    if (!toastWrap) {
        const toastView = h(VsToastView, { container });
        toastWrap = document.createElement('div');
        toastWrap.id = wrapperId;
        toastWrap.classList.add('vs-toast-view');
        if (container === 'body') {
            toastWrap.style.position = 'fixed';
        }
        containerElement.appendChild(toastWrap);
        render(toastView, toastWrap);
    }

    store.toast.push(toastInfo);
    if (toastInfo.autoClose) {
        setTimeout(() => {
            store.toast.remove(toastInfo.id);
        }, toastInfo.timeout || DEFAULT_TOAST_TIMEOUT);
    }
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
