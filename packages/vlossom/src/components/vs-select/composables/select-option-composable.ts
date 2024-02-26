import { computed, type Ref } from 'vue';
import { utils } from '@/utils';

export function useSelectOption(
    inputValue: Ref<any>,
    computedOptions: Ref<{ id: string; value: any }[]>,
    getOptionValue: (option: any) => any,
    multiple: Ref<boolean>,
    closeOptions: () => void,
) {
    function isSelectedOption(option: any) {
        if (multiple.value) {
            return inputValue.value.find((v: any) => utils.object.isEqual(v, getOptionValue(option))) !== undefined;
        } else {
            return utils.object.isEqual(inputValue.value, getOptionValue(option));
        }
    }

    function selectOption(option: any) {
        if (multiple.value) {
            if (isSelectedOption(option)) {
                removeSelected(option);
            } else {
                inputValue.value = [...inputValue.value, getOptionValue(option)];
            }
        } else {
            inputValue.value = getOptionValue(option);
            closeOptions();
        }
    }

    function selectAllOptions() {
        inputValue.value = computedOptions.value.map((option) => getOptionValue(option.value));
    }

    const isAllSelected = computed(() => {
        return computedOptions.value.length === inputValue.value.length;
    });

    function removeSelected(option: any) {
        if (!multiple.value) {
            return;
        }

        inputValue.value = inputValue.value.filter((v: any) => !utils.object.isEqual(v, getOptionValue(option)));
    }

    function removeChip() {
        if (!multiple.value) {
            return;
        }

        inputValue.value.splice(inputValue.value.length - 1, 1);
    }

    const selectedOptions = computed(() => {
        if (multiple.value) {
            return computedOptions.value.filter((option) =>
                inputValue.value?.find((v: any) => utils.object.isEqual(v, getOptionValue(option.value))),
            );
        } else {
            const selected = computedOptions.value.find((option) =>
                utils.object.isEqual(inputValue.value, getOptionValue(option.value)),
            );
            return selected ? [selected] : [];
        }
    });

    return {
        selectOption,
        selectAllOptions,
        isSelectedOption,
        isAllSelected,
        removeSelected,
        removeChip,
        selectedOptions,
    };
}
