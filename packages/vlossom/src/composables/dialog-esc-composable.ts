import { store } from '@/stores';
import { Ref, onBeforeUnmount, onMounted } from 'vue';

export function useDialogEsc(id: string, closeOnEsc: Ref<boolean>, onEsc: () => void) {
    function onPressEsc(event: KeyboardEvent) {
        if (closeOnEsc.value === false) {
            return;
        }

        if (event.key === 'Escape' && store.dialog.getTopId() === id) {
            onEsc();
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', onPressEsc);
        if (closeOnEsc.value) {
            store.dialog.push(id);
        }
    });

    onBeforeUnmount(() => {
        document.removeEventListener('keydown', onPressEsc);
        if (closeOnEsc.value) {
            store.dialog.pop();
        }
    });
}
