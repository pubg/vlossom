import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, OverlayCallbacks, VS_OVERLAY_CLOSE, VS_OVERLAY_OPEN } from '@/declaration';
import { useBodyScroll } from './scroll-lock-composable';

export function useOverlay(
    ctx: any,
    id: Ref<string>,
    modelValue: Ref<boolean>,
    initialOpen: boolean,
    escClose: Ref<boolean>,
    needScrollLock: Ref<boolean>,
    callbacks: OverlayCallbacks = {},
) {
    const { emit } = ctx;

    const innerId = utils.string.createID();
    const modalId = computed(() => id.value || innerId);

    const isOpen = ref(initialOpen || modelValue.value);
    const closing = ref(false);

    function open() {
        isOpen.value = true;
    }

    function close() {
        isOpen.value = false;
    }

    watch(modelValue, (o) => {
        isOpen.value = o;
    });

    const bodyScroll = useBodyScroll();
    watch(
        isOpen,
        (o) => {
            if (o) {
                if (needScrollLock.value) {
                    bodyScroll.lock();
                }

                store.overlay.push(modalId.value, callbacks);
            } else {
                if (!escClose.value) {
                    return;
                }

                closing.value = true;

                setTimeout(() => {
                    if (needScrollLock.value) {
                        bodyScroll.unlock();
                    }

                    closing.value = false;
                    store.overlay.remove(modalId.value);
                }, MODAL_DURATION);
            }

            emit('update:modelValue', o);
            emit(o ? VS_OVERLAY_OPEN : VS_OVERLAY_CLOSE);
        },
        { immediate: true },
    );

    return { modalId, isOpen, closing, open, close };
}
