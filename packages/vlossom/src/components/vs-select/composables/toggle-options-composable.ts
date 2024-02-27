import { ref, watch, onBeforeUnmount, type Ref } from 'vue';
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

    const { isVisible, computedPlacement, appear, disappear } = usePositioning(
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
            appear({
                align: 'start',
                placement: 'bottom',
                followWidth: true,
            });

            setTimeout(() => {
                document.addEventListener('click', onOutsideClick);
            });
        } else {
            document.removeEventListener('click', onOutsideClick);
            setTimeout(() => {
                disappear();
            }, 500);
        }
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', onOutsideClick);
    });

    return { isOpen, isVisible, computedPlacement, toggleOptions, closeOptions, triggerRef, optionsRef };
}
