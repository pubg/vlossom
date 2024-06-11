import { ref, watch, onBeforeUnmount, type Ref } from 'vue';
import { useOverlay, usePositioning } from '@/composables';

export function useToggleOptions(id: string, disabled: Ref<boolean>, readonly: Ref<boolean>) {
    useOverlay();

    const isOpen = ref(false);
    const isClosing = ref(false);

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

    const triggerRef: Ref<HTMLElement | null> = ref(null);
    const optionsRef: Ref<HTMLElement | null> = ref(null);

    const { isVisible, computedPlacement, appear, disappear } = usePositioning(
        triggerRef as Ref<HTMLElement>,
        optionsRef as Ref<HTMLElement>,
    );

    function onOutsideClick(e: MouseEvent) {
        const target = e.target as HTMLElement;

        // check if click outside of select
        if (isOpen.value && target.closest(`#${id}`) === null && target.closest('.vs-options-container') === null) {
            closeOptions();
        }
    }

    watch(isOpen, (opened) => {
        if (opened) {
            appear({
                align: 'start',
                placement: 'bottom',
                followWidth: true,
            });

            setTimeout(() => {
                document.addEventListener('click', onOutsideClick, true);
            });
        } else {
            document.removeEventListener('click', onOutsideClick, true);
            isClosing.value = true;

            // delay for animation
            setTimeout(() => {
                disappear();
                // for disable click on options
                isClosing.value = false;
            }, 500);
        }
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', onOutsideClick, true);
    });

    return { isOpen, isClosing, isVisible, computedPlacement, toggleOptions, closeOptions, triggerRef, optionsRef };
}
