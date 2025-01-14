import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, OverlayCallbacks } from '@/declaration';

export function useOverlay(id: Ref<string>, callbacks: Ref<OverlayCallbacks> = ref({}), escClose: Ref<boolean>) {
    const innerId = utils.string.createID();
    const overlayId = computed(() => id.value || innerId);

    const isOpen = ref(false);
    const closing = ref(false);

    function open() {
        isOpen.value = true;
    }

    function close() {
        isOpen.value = false;
    }

    const computedCallbacks = computed(() => {
        return {
            ...callbacks.value,
            'key-Escape': () => {
                callbacks.value['key-Escape']?.();
                if (escClose.value) {
                    close();
                }
            },
        };
    });

    watch(isOpen, (o) => {
        if (o) {
            store.overlay.push(overlayId.value, computedCallbacks);
        } else {
            closing.value = true;
            store.overlay.remove(overlayId.value);

            setTimeout(() => {
                closing.value = false;
            }, MODAL_DURATION);
        }
    });

    return { overlayId, isOpen, closing, open, close };
}
