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
    filteredOptions: Ref<{ id: string; value: any }[]>,
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

    function selectFocusedOption() {
        if (selectAll.value && focusedIndex.value === 0) {
            selectAllOptions();
        } else {
            selectOption(loadedOptions.value[focusedIndex.value - (selectAll.value ? 1 : 0)].value);
        }
    }

    function onComboboxKeydown(event: KeyboardEvent) {
        if (disabled.value || readonly.value) {
            return;
        }

        if (chasingMouse.value) {
            focusedIndex.value = hoveredIndex.value;
            chasingMouse.value = false;
        }

        if (!isOpen.value) {
            switch (event.code) {
                case 'Enter':
                case 'Space':
                case 'ArrowDown':
                case 'ArrowUp':
                    isOpen.value = true;
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        } else {
            const lastIndex = (selectAll.value ? 1 : 0) + loadedOptions.value.length - 1;
            switch (event.code) {
                case 'Enter':
                    if (focusedIndex.value !== -1) {
                        selectFocusedOption();
                    } else {
                        closeOptions();
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                    closeOptions();
                    comboboxFocus();
                    event.preventDefault();
                    break;
                case 'Space':
                    if (focusedIndex.value !== -1) {
                        selectFocusedOption();
                        event.preventDefault();
                    }
                    break;
                case 'ArrowDown':
                    if (focusedIndex.value >= lastIndex) {
                        focusedIndex.value = -1;
                    } else {
                        focusedIndex.value += 1;
                    }
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    if (focusedIndex.value < 0) {
                        focusedIndex.value = lastIndex;
                    } else {
                        focusedIndex.value -= 1;
                    }
                    event.preventDefault();
                    break;
                case 'Tab':
                    if (focusedIndex.value !== -1) {
                        selectFocusedOption();
                    }
                    closeOptions();
                    break;
                default:
                    break;
            }
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
            if (!element || !element.scrollIntoView) {
                return;
            }
            element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
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

    watch([isOpen, filteredOptions], (newValues, oldValues) => {
        const previouslyOpened = oldValues[0];
        const currentlyOpen = newValues[0];

        if (!previouslyOpened && currentlyOpen) {
            return;
        }
        resetFocusInfo();
    });

    function isChasedOption(optionIndex: number) {
        return (
            (chasingMouse.value ? hoveredIndex.value : focusedIndex.value) ===
            (selectAll.value ? optionIndex + 1 : optionIndex)
        );
    }

    const focusedOptionId = computed(() => {
        if (selectAll.value) {
            return focusedIndex.value === 0 ? 'vs-select-all' : loadedOptions.value[focusedIndex.value - 1]?.id;
        } else {
            return loadedOptions.value[focusedIndex.value]?.id;
        }
    });

    return {
        focusedIndex,
        focusedOptionId,
        hoveredIndex,
        chasingMouse,
        onComboboxKeydown,
        onMouseMove,
        isChasedOption,
    };
}
