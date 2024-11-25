import { h, render } from 'vue';
import { ModalOptions, ModalPlugin } from './types';
import { utils } from '@/utils';
import VsModalNode from '@/nodes/vs-modal-node/VsModalNode.vue';
import { store } from '@/stores';

function renderModalSlot(component: any) {
    const vnode = h(component);

    if (!vnode.type || typeof vnode.type === 'string') {
        return () => component;
    }

    return () => vnode;
}

export const modalPlugin: ModalPlugin = {
    open(options: ModalOptions) {
        const { component, header, footer, container, id, callbacks = {} } = options;
        const body = document?.body;
        if (!body) {
            return;
        }

        const props = utils.object.omit(options, ['component', 'header', 'footer', 'container', 'callbacks']);

        store.overlay.push(id || utils.string.createID(), callbacks || {});

        const modalView = h(
            VsModalNode,
            { ...props },
            {
                ...(header && { header: renderModalSlot(header) }),
                default: renderModalSlot(component),
                ...(footer && { footer: renderModalSlot(footer) }),
            },
        );
        render(modalView, container || body);
    },
    emit(event: string, ...args: any[]) {},
    emitWithId(id: string, event: string, ...args: any[]) {},
    close(...args: any[]) {},
    closeWithId(id: string, ...args: any[]) {},
    clear(...args: any[]) {},
};
