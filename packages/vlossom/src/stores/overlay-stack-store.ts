import { computed, ComputedRef, Ref, ref } from 'vue';

export class OverlayStackStore<T extends { id: string; container?: string }> {
    public readonly items: Ref<T[]> = ref([]);
    public readonly itemsByContainer: ComputedRef<{ [container: string]: T[] }> = computed(() => {
        const result: { [container: string]: T[] } = {};
        this.items.value.forEach((modal) => {
            const { container = 'body' } = modal;
            if (!result[container]) {
                result[container] = [];
            }
            result[container].push(modal);
        });
        return result;
    });

    push(options: T) {
        if (!options.id) {
            return;
        }

        this.items.value.push(options);
    }

    pop() {
        this.items.value.pop();
    }

    remove(id: string) {
        this.items.value = this.items.value.filter(({ id: modalId }) => modalId !== id);
    }

    clear() {
        this.items.value = [];
    }
}
