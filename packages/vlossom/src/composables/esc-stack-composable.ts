import { store } from '@/stores';
import { Ref, onBeforeUnmount, onMounted } from 'vue';

export function useEscStack(id: string, closeOnEsc: Ref<boolean>, onEsc: () => void) {
    function onPressEsc(event: KeyboardEvent) {
        if (closeOnEsc.value === false) {
            return;
        }

        if (event.key === 'Escape' && store.escStack.getTopId() === id) {
            onEsc();
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', onPressEsc);
        if (closeOnEsc.value) {
            store.escStack.push(id);
        }
    });

    onBeforeUnmount(() => {
        document.removeEventListener('keydown', onPressEsc);
        if (closeOnEsc.value) {
            store.escStack.pop();
        }
    });
}
