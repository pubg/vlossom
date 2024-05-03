import { ref, watch, nextTick, type Ref } from 'vue';
import { utils } from '@/utils';

export function useAutocomplete(
    autocomplete: Ref<boolean>,
    computedOptions: Ref<{ id: string; value: any }[]>,
    getOptionLabel: (option: any) => string,
    isOpen: Ref<boolean>,
    inputSelect: () => void,
) {
    const autocompleteText = ref('');
    const filteredOptions: Ref<{ id: string; value: any }[]> = ref([...computedOptions.value]);

    function updateAutocompleteText(event: Event) {
        const target = event.target as HTMLInputElement;
        autocompleteText.value = target.value;
    }

    watch(
        autocompleteText,
        utils.function.debounce({ delay: 300 }, () => {
            const lower = autocompleteText.value.toLowerCase();
            filteredOptions.value = computedOptions.value.filter((option) => {
                const label = getOptionLabel(option.value);
                return label.toLowerCase().includes(lower);
            });
        }),
    );

    watch(isOpen, () => {
        if (isOpen.value && autocomplete.value) {
            nextTick(() => {
                inputSelect();
            });
        }
    });

    watch(computedOptions, () => {
        autocompleteText.value = '';
    });

    return {
        autocompleteText,
        filteredOptions,
        updateAutocompleteText,
    };
}
