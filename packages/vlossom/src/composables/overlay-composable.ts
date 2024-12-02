import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, OverlayCallbacks } from '@/declaration';
import { useBodyScroll } from './scroll-lock-composable';

export function useOverlay(
    id: Ref<string>,
    initialOpen: boolean,
    needScrollLock: Ref<boolean>,
    callbacks: Ref<OverlayCallbacks> = ref({}),
    onClose?: () => void,
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

    const bodyScroll = useBodyScroll();
    watch(
        isOpen,
        (o) => {
            if (o) {
                if (needScrollLock.value) {
                    bodyScroll.lock();
                }

                store.overlay.push(overlayId.value, callbacks);
            } else {
                closing.value = true;
                store.overlay.remove(overlayId.value);
                onClose?.();

                setTimeout(() => {
                    if (needScrollLock.value) {
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
