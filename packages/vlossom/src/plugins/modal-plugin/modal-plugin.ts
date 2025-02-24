import { h, render } from 'vue';
import { ModalPlugin } from './types';
import { getApp } from '@/vlossom-framework';
import { utils } from '@/utils';
import { store } from '@/stores';
import { VsModalView, VsModalOptions } from '@/components';
import { useOverlayDom } from '@/composables';

export const modalPlugin: ModalPlugin = {
    open(options: VsModalOptions) {
        const { id = utils.string.createID(), container = 'body' } = options;
        const containerElement = document.querySelector(container);
        if (!containerElement) {
            utils.log.error('modal', `target container not found (${container})`);
            return '';
        }

        store.modal.push({ ...options, id });

        const { appendOverlayDom } = useOverlayDom();
        const overlay = appendOverlayDom(containerElement, `vs-modal-overlay-${container.replace('#', '')}`, {
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
        });

        const modalView = h(VsModalView, { container });
        modalView.appContext = getApp()._context;
        render(modalView, overlay);

        return id;
    },
    emit(eventName: string, ...args: any[]) {
        const lastOverlayId = store.overlay.getLastOverlayId();
        return store.overlay.run(lastOverlayId, eventName, ...args);
    },
    emitWithId(id: string, eventName: string, ...args: any[]) {
        return store.overlay.run(id, eventName, ...args);
    },
    close(...args: any[]) {
        store.modal.pop();
        return store.overlay.pop(...args);
    },
    closeWithId(id: string, ...args: any[]) {
        store.modal.remove(id);
        return store.overlay.remove(id, ...args);
    },
    clear(...args: any[]) {
        store.modal.clear();
        store.overlay.clear(...args);
    },
};
