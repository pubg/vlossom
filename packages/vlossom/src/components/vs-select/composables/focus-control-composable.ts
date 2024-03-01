import { ref, watch, nextTick, computed, type Ref, type ComputedRef } from 'vue';
import { utils } from '@/utils';

export function useFocusControl(
    disabled: Ref<boolean>,
    readonly: Ref<boolean>,
    isOpen: Ref<boolean>,
    closeOptions: () => void,
    selectAll: Ref<boolean>,
    isAllSelected: ComputedRef<boolean>,
    selectedOptions: ComputedRef<{ id: string; value: any }[]>,
    loadedOptions: Ref<{ id: string; value: any }[]>,
    selectOption: (option: any) => void,
    selectAllOptions: () => void,
    comboboxFocus: () => void,
) {
    const focusedIndex = ref(-1);
    const hoveredIndex = ref(-1);
    const chasingMouse = ref(false);

    function resetFocusInfo() {
        focusedIndex.value = -1;
        hoveredIndex.value = -1;
        chasingMouse.value = false;
    }

    function selectFousedOption() {
        if (selectAll.value && focusedIndex.value === 0) {
            selectAllOptions();
        } else {
            selectOption(loadedOptions.value[focusedIndex.value - (selectAll.value ? 1 : 0)].value);
        }
    }

    function onArrowDownKey(event: KeyboardEvent) {
        if (!isOpen.value && focusedIndex.value === -1) {
            isOpen.value = true;
        }

        if (focusedIndex.value < (selectAll.value ? 1 : 0) + loadedOptions.value.length - 1) {
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
        if (isOpen.value) {
            if (focusedIndex.value !== -1) {
                selectFousedOption();
            } else {
                closeOptions();
            }
        } else {
            isOpen.value = true;
        }

        event.preventDefault();
    }

    function onEscapeKey(event: KeyboardEvent) {
        closeOptions();
        comboboxFocus();

        event.preventDefault();
    }

    function onTabKey() {
        if (isOpen.value) {
            if (focusedIndex.value !== -1) {
                selectFousedOption();
            }

            closeOptions();
        }
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
            case 'Escape':
                onEscapeKey(event);
                break;
            case 'Tab':
                onTabKey();
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
            const element = document.querySelector(`li[id="${id}"]`);
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
            resetFocusInfo();
        }
    });

    watch(loadedOptions, resetFocusInfo);

    const focusedOptionId = computed(() => {
        if (selectAll.value) {
            return focusedIndex.value === 0 ? 'vs-select-all' : loadedOptions.value[focusedIndex.value - 1]?.id;
        } else {
            return loadedOptions.value[focusedIndex.value]?.id;
        }
    });

    return {
        focusedIndex,
        hoveredIndex,
        chasingMouse,
        onKeyDown,
        onMouseMove,
        focusedOptionId,
    };
}
