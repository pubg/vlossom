import { computed, ref, Ref } from 'vue';

export function useIndexSelector(list: Ref<string[]>, disabled: Ref<number[]> = ref([])) {
    const selectedIndex = ref(0);

    const isLeftEdge = computed(() => {
        if (selectedIndex.value === -1) {
            return true;
        }
        const targetDisabled = disabled.value.filter((i) => i >= 0 && i < selectedIndex.value);
        return targetDisabled.length === selectedIndex.value;
    });

    const isRightEdge = computed(() => {
        if (selectedIndex.value === -1) {
            return true;
        }
        const targetDisabled = disabled.value.filter((i) => i > selectedIndex.value);
        return targetDisabled.length === list.value.length - selectedIndex.value - 1;
    });

    function isSelected(index: number): boolean {
        return selectedIndex.value === index;
    }

    function isDisabled(index: number): boolean {
        return disabled.value.includes(index);
    }

    function isPrevious(index: number) {
        return index < selectedIndex.value;
    }

    function findNextActivedIndex(targetIndex: number): number {
        const tabsLength = list.value.length;
        for (let i = targetIndex; i < tabsLength + targetIndex; i++) {
            const index = i % tabsLength;
            if (!isDisabled(index)) {
                return index;
            }
        }
        return targetIndex;
    }

    function findPreviousActivedIndex(targetIndex: number): number {
        const tabsLength = list.value.length;
        for (let i = targetIndex; i > targetIndex - tabsLength; i--) {
            const index = (i + tabsLength) % tabsLength;
            if (!isDisabled(index)) {
                return index;
            }
        }
        return targetIndex;
    }

    function getInitialIndex(index: number): number {
        return index === -1 ? -1 : findNextActivedIndex(index);
    }

    function selectIndex(index: number) {
        const tabsLength = list.value.length;
        const isOutOfRange = index < 0 || index > tabsLength - 1;
        const isAllDisabled = disabled.value.length === tabsLength;
        if (isOutOfRange || isAllDisabled || isDisabled(index)) {
            selectedIndex.value = -1;
            return;
        }

        selectedIndex.value = index;
    }

    function handleKeydown(event: KeyboardEvent) {
        let targetIndex = selectedIndex.value;
        switch (event.code) {
            case 'ArrowLeft': {
                if (isLeftEdge.value) {
                    return;
                }
                event.preventDefault();
                targetIndex = findPreviousActivedIndex(targetIndex - 1);
                break;
            }
            case 'ArrowRight': {
                if (isRightEdge.value) {
                    return;
                }
                event.preventDefault();
                targetIndex = findNextActivedIndex(targetIndex + 1);
                break;
            }
            case 'Home': {
                event.preventDefault();
                targetIndex = findNextActivedIndex(0);
                break;
            }
            case 'End': {
                event.preventDefault();
                targetIndex = findPreviousActivedIndex(list.value.length - 1);
                break;
            }
            default:
                return;
        }

        selectIndex(targetIndex);
    }

    return {
        selectedIndex,
        isLeftEdge,
        isRightEdge,
        isSelected,
        isDisabled,
        isPrevious,
        findNextActivedIndex,
        findPreviousActivedIndex,
        getInitialIndex,
        selectIndex,
        handleKeydown,
    };
}
