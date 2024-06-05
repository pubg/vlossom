import { ref, watch, type Ref } from 'vue';
import { utils } from '@/utils';

export function useAutocomplete(
    computedOptions: Ref<{ id: string; value: any }[]>,
    getOptionLabel: (option: any) => string,
    isOpen: Ref<boolean>,
) {
    const autocompleteText = ref('');
    const filteredOptions: Ref<{ id: string; value: any }[]> = ref([...computedOptions.value]);

    function updateAutocompleteText(text: string) {
        autocompleteText.value = text;
    }

    watch(
        autocompleteText,
        utils.function.debounce(() => {
            const lower = autocompleteText.value.toLowerCase();
            filteredOptions.value = computedOptions.value.filter((option) => {
                const label = getOptionLabel(option.value);
                return label.toLowerCase().includes(lower);
            });
        }, 300),
    );

    watch(isOpen, (val) => {
        if (val) {
            filteredOptions.value = [...computedOptions.value];
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
