import { ref, watch, nextTick, type Ref, type ComputedRef } from 'vue';
import { utils } from '@/utils';

export function useFocus(
    disabled: Ref<boolean>,
    readonly: Ref<boolean>,
    isOpen: Ref<boolean>,
    selectAll: Ref<boolean>,
    isAllSelected: ComputedRef<boolean>,
    selectedOptions: ComputedRef<{ id: string; value: any }[]>,
    loadedOptions: Ref<{ id: string; value: any }[]>,
    selectOption: (option: any) => void,
) {
    const focusedIndex = ref(-1);
    const hoveredIndex = ref(-1);
    const chasingMouse = ref(false);

    function onArrowDownKey(event: KeyboardEvent) {
        if (focusedIndex.value < (selectAll.value ? 1 : 0) + loadedOptions.value.length) {
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
            isOpen.value = true;
        } else {
            if (focusedIndex.value !== -1) {
                selectOption(loadedOptions.value[focusedIndex.value - (selectAll.value ? 1 : 0)].value);
            } else {
                isOpen.value = false;
            }
        }

        event.preventDefault();
    }

    function onKeyDown(event: KeyboardEvent) {
        if (disabled.value || readonly.value) {
            return;
        }

        if (chasingMouse.value) {
            focusedIndex.value = hoveredIndex.value;
            chasingMouse.value = false;
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
        chasingMouse.value = true;

        if (!option.id && option === 'all') {
            hoveredIndex.value = 0;
        } else {
            hoveredIndex.value = loadedOptions.value.findIndex((o) => o.id === option.id) + (selectAll.value ? 1 : 0);
        }
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

    watch(isOpen, (value) => {
        if (value) {
            const firstSelected = selectedOptions.value[0];
            if (firstSelected) {
                focusedIndex.value = isAllSelected.value
                    ? 0
                    : loadedOptions.value.findIndex((option) => option.id === firstSelected.id) +
                      (selectAll.value ? 1 : 0);
            }
        } else {
            focusedIndex.value = -1;
            hoveredIndex.value = -1;
            chasingMouse.value = false;
        }
    });

    watch(loadedOptions, () => {
        focusedIndex.value = -1;
        hoveredIndex.value = -1;
        chasingMouse.value = false;
    });

    return {
        focusedIndex,
        hoveredIndex,
        chasingMouse,
        onKeyDown,
        onMouseMove,
    };
}
