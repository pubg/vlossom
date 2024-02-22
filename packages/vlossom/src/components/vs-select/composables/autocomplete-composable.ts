import { ref, watch, type Ref } from 'vue';
import { utils } from '@/utils';

export function useAutocomplete(
    computedOptions: Ref<{ id: string; value: any }[]>,
    getOptionLabel: (option: any) => string,
) {
    const autocompleteText = ref('');
    const focusing = ref(false);
    const filteredOptions: Ref<{ id: string; value: any }[]> = ref([...computedOptions.value]);

    function onFocus() {
        focusing.value = true;
    }

    function onBlur() {
        focusing.value = false;
    }

    function updateAutocompleteText(event: Event) {
        const target = event.target as HTMLInputElement;
        autocompleteText.value = target.value;
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

    watch(computedOptions, () => {
        autocompleteText.value = '';
    });

    return {
        autocompleteText,
        focusing,
        filteredOptions,
        onFocus,
        onBlur,
        updateAutocompleteText,
    };
}
