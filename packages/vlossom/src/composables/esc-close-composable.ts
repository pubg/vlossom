import { Ref, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { store } from '@/stores';
import { MODAL_DURATION } from '@/declaration';

export function useEscClose(id: string, closeOnEsc: Ref<boolean>, isOpen: Ref<boolean>, onEscClose: () => void) {
    const closing = ref(false);

    function onPressEsc(event: KeyboardEvent) {
        if (!closeOnEsc.value || closing.value) {
            return;
        }

        if (event.key === 'Escape' && store.escStack.getTopId() === id) {
            closing.value = true;
            onEscClose();

            setTimeout(() => {
                store.escStack.pop();
                closing.value = false;
            }, MODAL_DURATION);
        }
    }

    watch(
        isOpen,
        (open) => {
            if (!closeOnEsc.value) {
                return;
            }

            if (open) {
                store.escStack.push(id);
            }
        },
        { immediate: true },
    );

    onMounted(() => {
        document.addEventListener('keydown', onPressEsc);
    });

    onBeforeUnmount(() => {
        if (closeOnEsc.value) {
            store.escStack.remove(id);
        }
        document.removeEventListener('keydown', onPressEsc);
    });
}
