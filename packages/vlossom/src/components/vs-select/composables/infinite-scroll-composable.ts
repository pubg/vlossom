import { ref, watch, nextTick, type Ref } from 'vue';
import { useInfiniteScroll as useVueUseInfiniteScroll } from '@vueuse/core';

export function useInfiniteScroll(
    filteredOptions: Ref<{ id: string; value: any }[]>,
    lazyLoadNum: Ref<number>,
    isOpen: Ref<boolean>,
) {
    const listboxRef: Ref<HTMLElement | null> = ref(null);
    const optionPageIndex = ref(1);
    const loadedOptions: Ref<{ id: string; value: any }[]> = ref(filteredOptions.value.slice(0, lazyLoadNum.value));

    function loadMore() {
        optionPageIndex.value += 1;
        const endIndex = optionPageIndex.value * lazyLoadNum.value;

        loadedOptions.value = filteredOptions.value.slice(0, endIndex);
    }

    watch(isOpen, () => {
        if (isOpen.value) {
            nextTick(() => {
                useVueUseInfiniteScroll(listboxRef, loadMore, { distance: 20 });
            });
        }
    });

    watch(filteredOptions, () => {
        optionPageIndex.value = 1;
        loadedOptions.value = filteredOptions.value.slice(0, lazyLoadNum.value);
    });

    return {
        listboxRef,
        loadedOptions,
    };
}
