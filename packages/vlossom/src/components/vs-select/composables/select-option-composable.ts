import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

export function useSelectOption(
    inputValue: Ref<any>,
    getOptionValue: (option: any) => any,
    computedOptions: ComputedRef<{ value: any; vlossomId: string }[]>,
    multiple: Ref<boolean>,
    closeOptions: () => void,
) {
    function isSelectedOption(option: any) {
        if (multiple.value) {
            return !!inputValue.value.find((v: any) => utils.object.isEqual(v, getOptionValue(option)));
        } else {
            return utils.object.isEqual(inputValue.value, getOptionValue(option));
        }
    }

    function selectOption(option: any) {
        if (multiple.value) {
            if (isSelectedOption(option)) {
                removeSelected(option);
            } else {
                inputValue.value.push(getOptionValue(option));
            }
        } else {
            inputValue.value = getOptionValue(option);
            closeOptions();
        }
    }

    function selectAllOptions() {
        inputValue.value = computedOptions.value.map((o) => getOptionValue(o.value));
    }

    function removeSelected(option: any) {
        if (!multiple.value) {
            return;
        }

        inputValue.value = inputValue.value.filter((v: any) => !utils.object.isEqual(v, getOptionValue(option)));
    }

    const selectedOptions = computed(() => {
        if (multiple.value) {
            return computedOptions.value.filter((o) =>
                inputValue.value?.find((v: any) => utils.object.isEqual(v, getOptionValue(o.value))),
            );
        } else {
            const selected = computedOptions.value.find((o) =>
                utils.object.isEqual(inputValue.value, getOptionValue(o.value)),
            );
            return selected ? [selected] : [];
        }
    });

    return {
        selectOption,
        selectAllOptions,
        isSelectedOption,
        removeSelected,
        selectedOptions,
    };
}
