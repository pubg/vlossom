import { ref, watch, nextTick, type Ref, type ComputedRef } from 'vue';
import { utils } from '@/utils';

export function useFocus(
    disabled: Ref<boolean>,
    readonly: Ref<boolean>,
    isOpen: Ref<boolean>,
    selectedOptions: ComputedRef<{ id: string; value: any }[]>,
    loadedOptions: Ref<{ id: string; value: any }[]>,
    selectOption: (option: any) => void,
) {
    const focusedIndex = ref(-1);

    function onArrowDownKey(event: KeyboardEvent) {
        if (focusedIndex.value < loadedOptions.value.length - 1) {
            focusedIndex.value += 1;
        }

        event.preventDefault();
    }

    function onArrowUpKey(event: KeyboardEvent) {
        if (focusedIndex.value > 0) {
            focusedIndex.value -= 1;
        }

        event.preventDefault();
    }

    function onEnterKey(event: KeyboardEvent) {
        if (!isOpen.value) {
            focusedIndex.value = 0;
            isOpen.value = true;
        } else if (focusedIndex.value !== -1) {
            selectOption(loadedOptions.value[focusedIndex.value].value);
            isOpen.value = false;
        }

        event.preventDefault();
    }

    function onKeyDown(event: KeyboardEvent) {
        if (disabled.value || readonly.value) {
            return;
        }

        switch (event.code) {
            case 'ArrowDown':
                onArrowDownKey(event);
                break;
            case 'ArrowUp':
                onArrowUpKey(event);
                break;
            case 'Enter':
            case 'Space':
                onEnterKey(event);
                break;
            default:
                break;
        }
    }

    const onMouseMove = utils.function.throttle((option: any) => {
        focusedIndex.value = loadedOptions.value.findIndex((o) => o.id === option.id);
    }, 50);

    function scrollIntoView() {
        const id = loadedOptions.value[focusedIndex.value]?.id;
        if (id) {
            const element = document.querySelector('li[id="' + id + '"]');
            element?.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }

    watch(focusedIndex, () => {
        nextTick(() => {
            scrollIntoView();
        });
    });

    watch(isOpen, () => {
        if (isOpen.value) {
            const firstSelected = selectedOptions.value[0];
            if (firstSelected) {
                focusedIndex.value = loadedOptions.value.findIndex((option) => option.id === firstSelected.id);
            } else {
                focusedIndex.value = -1;
            }
        } else {
            focusedIndex.value = -1;
        }
    });

    watch(loadedOptions, () => {
        focusedIndex.value = -1;
    });

    return {
        focusedIndex,
        onKeyDown,
        onMouseMove,
    };
}
