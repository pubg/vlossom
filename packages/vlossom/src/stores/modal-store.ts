import { computed, ComputedRef, Ref, ref } from 'vue';
import { VsModalOptions } from '@/components';
export class ModalStore {
    public readonly modals: Ref<VsModalOptions[]> = ref([]);
    public readonly modalsByContainer: ComputedRef<{ [container: string]: VsModalOptions[] }> = computed(() => {
        const modalsByContainer: { [container: string]: VsModalOptions[] } = {};
        this.modals.value.forEach((modal) => {
            const { container = 'body' } = modal;
            if (!modalsByContainer[container]) {
                modalsByContainer[container] = [];
            }
            modalsByContainer[container].push(modal);
        });
        return modalsByContainer;
    });

    push(options: VsModalOptions) {
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
