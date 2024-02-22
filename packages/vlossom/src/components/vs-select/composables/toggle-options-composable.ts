import { nextTick, ref, watch, type Ref } from 'vue';
import { useOverlay, usePositioning } from '@/composables';

export function useToggleOptions() {
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
            });
        } else {
            // setTimeout(() => {
            //     disappear();
            // }, 200);
            disappear();
        }
    });

    return { isOpen, isVisible, toggleOptions, closeOptions, triggerRef, optionsRef };
}
