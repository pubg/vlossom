import { computed, ComputedRef, Ref, ref, readonly } from 'vue';

export class OverlayStackStore<T extends { id?: string; container?: string }> {
    private _items: Ref<T[]> = ref([]);
    public items = readonly(this._items);

    public itemsByContainer: ComputedRef<{ [container: string]: T[] }> = computed(() => {
        const result: { [container: string]: T[] } = {};
        this._items.value.forEach((modal) => {
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

        this._items.value.push(options);
    }

    pop() {
        this._items.value.pop();
    }

    remove(id: string) {
        this._items.value = this._items.value.filter(({ id: modalId }) => modalId !== id);
    }

    clear() {
        this._items.value = [];
    }
}
