import { nextTick, ref, watch, type Ref } from 'vue';
import { useOverlay, usePositioning } from '@/composables';

export function useToggleOptions(
    addInfiniteScroll: (optionsRef: Ref<HTMLElement | null>) => void,
    removeInfiniteScroll: (optionsRef: Ref<HTMLElement | null>) => void,
) {
    const isOpen = ref(false);

    function toggleOptions() {
        isOpen.value = !isOpen.value;
    }

    function closeOptions() {
        isOpen.value = false;
    }

    useOverlay();

    const triggerRef: Ref<HTMLElement | null> = ref(null);
    const optionsRef: Ref<HTMLElement | null> = ref(null);

    const { isVisible, appear, disappear } = usePositioning(
        triggerRef as Ref<HTMLElement>,
        optionsRef as Ref<HTMLElement>,
    );

    watch(isOpen, (newValue) => {
        if (newValue) {
            nextTick(() => {
                appear({
                    align: 'start',
                    placement: 'bottom',
                    followWidth: true,
                });

                addInfiniteScroll(optionsRef);
            });
        } else {
            // setTimeout(() => {
            //     disappear();
            // }, 200);
            disappear();
            removeInfiniteScroll(optionsRef);
        }
    });

    return { isOpen, isVisible, toggleOptions, closeOptions, triggerRef, optionsRef };
}
