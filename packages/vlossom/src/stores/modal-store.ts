import { Ref, ref } from 'vue';
import { ModalOptions } from '@/declaration';

export class ModalStore {
    public readonly modals: Ref<[string, ModalOptions][]> = ref([]);

    push(id: string, options: ModalOptions) {
        this.modals.value.push([id, options]);
    }

    pop() {
        this.modals.value.pop();
    }

    remove(id: string) {
        this.modals.value = this.modals.value.filter(([modalId]) => modalId !== id);
    }

    clear() {
        this.modals.value = [];
    }
}
