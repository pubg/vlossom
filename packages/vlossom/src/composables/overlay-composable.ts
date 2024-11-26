import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, OverlayCallbacks } from '@/declaration';
import { useBodyScroll } from './scroll-lock-composable';

export function useOverlay(
    ctx: any,
    id: Ref<string>,
    modelValue: Ref<boolean>,
    initialOpen: boolean,
    needScrollLock: Ref<boolean>,
    callbacks: Ref<OverlayCallbacks> = ref({}),
) {
    const { emit } = ctx;

    const innerId = utils.string.createID();
    const overlayId = computed(() => id.value || innerId);

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

                store.overlay.push(overlayId.value, callbacks);
            } else {
                closing.value = true;

                setTimeout(() => {
                    if (needScrollLock.value) {
                        bodyScroll.unlock();
                    }

                    closing.value = false;
                    store.overlay.remove(overlayId.value);
                }, MODAL_DURATION);
            }

            emit('update:modelValue', o);
            emit(o ? 'open' : 'close');
        },
        { immediate: true },
    );

    return { overlayId, isOpen, closing, open, close };
}
