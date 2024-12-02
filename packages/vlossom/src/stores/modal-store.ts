import { computed, ComputedRef, Ref, ref } from 'vue';
import { ModalOptions } from '@/nodes';

export class ModalStore {
    public readonly modals: Ref<ModalOptions[]> = ref([]);
    public readonly modalsByContainer: ComputedRef<{ [container: string]: ModalOptions[] }> = computed(() => {
        const modalsByContainer: { [container: string]: ModalOptions[] } = {};
        this.modals.value.forEach((modal) => {
            const { container = 'body' } = modal;
            if (!modalsByContainer[container]) {
                modalsByContainer[container] = [];
            }
            modalsByContainer[container].push(modal);
        });
        return modalsByContainer;
    });

    push(options: ModalOptions) {
        if (!options.id) {
            return;
        }

        this.modals.value.push(options);
    }

    pop() {
        this.modals.value.pop();
    }

    remove(id: string) {
        this.modals.value = this.modals.value.filter(({ id: modalId }) => modalId !== id);
    }

    clear() {
        this.modals.value = [];
    }
}
