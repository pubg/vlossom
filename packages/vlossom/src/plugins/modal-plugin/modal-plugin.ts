import { h, render } from 'vue';
import { ModalPlugin } from './types';
import { utils } from '@/utils';
import { store } from '@/stores';
import { VsModalView, ModalOptions } from '@/nodes';

export const modalPlugin: ModalPlugin = {
    open(options: ModalOptions) {
        const { id = utils.string.createID(), container = 'body' } = options;
        const containerElement = document.querySelector(container);
        if (!containerElement) {
            utils.log.error('vs-modal', `container not found: ${container}`);
            return;
        }

        const modalView = h(VsModalView, { container });
        render(modalView, containerElement);

        store.modal.push({ ...options, id });
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
