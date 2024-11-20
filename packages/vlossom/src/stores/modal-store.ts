import { ModalCallbacks } from '@/declaration';

export class ModalStore {
    private modals: [string, ModalCallbacks][] = [];

    constructor() {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (this.modals.length === 0) {
                return;
            }
            if (event.key === 'Enter') {
                console.log('Enter');
            }
            if (event.key === 'Escape') {
                this.pop();
            }
        });
    }

    push(id: string, callbacks: ModalCallbacks) {
        if (this.modals.some(([stackId]) => stackId === id)) {
            this.addCallbacks(id, callbacks);
        } else {
            this.modals.push([id, callbacks]);
        }

        callbacks.open?.();
    }

    addCallbacks(id: string, callbacks: ModalCallbacks) {
        const index = this.modals.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [, currentCallbacks] = this.modals[index];
        this.modals[index] = [id, { ...currentCallbacks, ...callbacks }];
    }

    pop() {
        const popped = this.modals.pop();
        if (!popped) {
            return;
        }
        const [, callbacks] = popped;
        callbacks.close?.();
    }

    remove(id: string) {
        const index = this.modals.findIndex(([stackId]) => stackId === id);
        if (index === -1) {
            return;
        }
        const [popped] = this.modals.splice(index, 1);
        if (!popped) {
            return;
        }
        const [, callbacks] = popped;
        callbacks.close?.();
    }
}
