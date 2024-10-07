import { Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { MODAL_DURATION } from '@/declaration';

export function useEscClose(id: string, closeOnEsc: Ref<boolean>, isOpen: Ref<boolean>, onEscClose: () => void) {
    const closing = ref(false);

    watch(
        isOpen,
        (open) => {
            if (!closeOnEsc.value) {
                return;
            }

            if (open) {
                store.escStack.push(id, onEscClose);
            } else {
                closing.value = true;

                setTimeout(() => {
                    closing.value = false;
                    store.escStack.remove(id);
                }, MODAL_DURATION);
            }
        },
        { immediate: true },
    );
}
