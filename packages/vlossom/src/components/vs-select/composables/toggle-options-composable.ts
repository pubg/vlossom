import { nextTick, ref, watch, onBeforeUnmount, type Ref } from 'vue';
import { useOverlay, usePositioning } from '@/composables';

export function useToggleOptions(disabled: Ref<boolean>, readonly: Ref<boolean>) {
    const isOpen = ref(false);

    function toggleOptions() {
        if (disabled.value || readonly.value) {
            return;
        }

        isOpen.value = !isOpen.value;
    }

    function closeOptions() {
        if (disabled.value || readonly.value) {
            return;
        }

        isOpen.value = false;
    }

    useOverlay();

    const triggerRef: Ref<HTMLElement | null> = ref(null);
    const optionsRef: Ref<HTMLElement | null> = ref(null);

    const { isVisible, appear, disappear } = usePositioning(
        triggerRef as Ref<HTMLElement>,
        optionsRef as Ref<HTMLElement>,
    );

    function onOutsideClick() {
        if (isOpen.value) {
            closeOptions();
        }
    }

    watch(isOpen, (newValue) => {
        if (newValue) {
            nextTick(() => {
                appear({
                    align: 'start',
                    placement: 'bottom',
                    followWidth: true,
                });

                setTimeout(() => {
                    document.addEventListener('click', onOutsideClick);
                });
            });
        } else {
            // setTimeout(() => {
            //     disappear();
            // }, 200);
            document.removeEventListener('click', onOutsideClick);
            disappear();
        }
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', onOutsideClick);
    });

    return { isOpen, isVisible, toggleOptions, closeOptions, triggerRef, optionsRef };
}
