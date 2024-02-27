import { ref, watch, nextTick, type Ref } from 'vue';
import { utils } from '@/utils';

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

    const infiniteScrollHandler = utils.function.throttle((event: InputEvent) => {
        const element = event.target as HTMLInputElement;

        if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 200) {
            if (loadedOptions.value.length === filteredOptions.value.length) {
                return;
            }

            loadMore();
        }
    }, 500);

    function addInfiniteScroll() {
        if (optionsRef.value) {
            optionsRef.value.addEventListener('scroll', infiniteScrollHandler);
        }
    }

    function removeInfiniteScroll() {
        if (optionsRef.value) {
            optionsRef.value.removeEventListener('scroll', infiniteScrollHandler);
        }
    }

    watch(isOpen, (newValue) => {
        if (newValue) {
            nextTick(() => {
                addInfiniteScroll();
            });
        } else {
            removeInfiniteScroll();
        }
    });

    watch(filteredOptions, () => {
        optionPageIndex.value = 1;
        loadedOptions.value = filteredOptions.value.slice(0, loadNumber.value);
    });

    return {
        loadedOptions,
        addInfiniteScroll,
        removeInfiniteScroll,
    };
}
