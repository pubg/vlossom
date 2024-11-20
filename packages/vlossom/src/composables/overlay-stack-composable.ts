import { computed, Ref, ref, watch } from 'vue';
import { store } from '@/stores';
import { utils } from '@/utils';
import { MODAL_DURATION, ModalCallbacks } from '@/declaration';
import { useBodyScroll } from './scroll-lock-composable';

export function useOverlay(
    ctx: any,
    id: Ref<string>,
    modelValue: Ref<boolean>,
    initialOpen: boolean,
    escClose: Ref<boolean>,
    dimmed: Ref<boolean>,
    hasContainer: Ref<boolean>,
    callbacks: ModalCallbacks,
) {
    const { emit } = ctx;
    const isOpen = ref(initialOpen || modelValue.value);
    const closing = ref(false);
    const bodyScroll = useBodyScroll();

    const modalId = id.value || utils.string.createID();
    const needScrollLock = computed(() => dimmed.value && !hasContainer.value);

    watch(modelValue, (open) => {
        isOpen.value = open;
    });

    watch(
        isOpen,
        (open) => {
            if (open) {
                if (needScrollLock.value) {
                    bodyScroll.lock();
                }

                store.modal.push(modalId, callbacks);
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
                    store.modal.remove(modalId);
                }, MODAL_DURATION);
            }

            emit('update:modelValue', open);
            emit(open ? 'open' : 'close');
        },
        { immediate: true },
    );

    return { modalId, isOpen, closing };
}
