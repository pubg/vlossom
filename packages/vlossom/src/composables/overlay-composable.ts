import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, OverlayCallbacks } from '@/declaration';
import { useBodyScroll } from './scroll-lock-composable';

export function useOverlay(
    id: Ref<string>,
    initialOpen: boolean,
    scrollLock: Ref<boolean>,
    callbacks: Ref<OverlayCallbacks> = ref({}),
    escClose: Ref<boolean>,
) {
    const innerId = utils.string.createID();
    const overlayId = computed(() => id.value || innerId);

    const isOpen = ref(initialOpen || false);
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

    const bodyScroll = useBodyScroll();
    watch(
        isOpen,
        (o) => {
            if (o) {
                if (scrollLock.value) {
                    bodyScroll.lock();
                }

                store.overlay.push(overlayId.value, computedCallbacks);
            } else {
                closing.value = true;
                store.overlay.remove(overlayId.value);

                setTimeout(() => {
                    if (scrollLock.value) {
                        bodyScroll.unlock();
                    }

                    closing.value = false;
                }, MODAL_DURATION);
            }
        },
        { immediate: true },
    );

    return { overlayId, isOpen, closing, open, close };
}
