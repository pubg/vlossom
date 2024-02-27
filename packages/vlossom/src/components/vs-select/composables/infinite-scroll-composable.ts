import { ref, watch, nextTick, type Ref } from 'vue';
import { useInfiniteScroll as useVueUseInfiniteScroll } from '@vueuse/core';

export function useInfiniteScroll(
    filteredOptions: Ref<{ id: string; value: any }[]>,
    loadNumber: Ref<number>,
    isOpen: Ref<boolean>,
    optionsRef: Ref<HTMLElement | null>,
) {
    const optionPageIndex = ref(1);
    const loadedOptions: Ref<{ id: string; value: any }[]> = ref(filteredOptions.value.slice(0, loadNumber.value));

    function loadMore() {
        optionPageIndex.value += 1;
        const endIndex = optionPageIndex.value * loadNumber.value;

        loadedOptions.value = filteredOptions.value.slice(0, endIndex);
    }

    watch(isOpen, (newValue) => {
        if (newValue) {
            nextTick(() => {
                useVueUseInfiniteScroll(optionsRef, loadMore, { distance: 20 });
            });
        }
    });

    watch(filteredOptions, () => {
        optionPageIndex.value = 1;
        loadedOptions.value = filteredOptions.value.slice(0, loadNumber.value);
    });

    return {
        loadedOptions,
    };
}
