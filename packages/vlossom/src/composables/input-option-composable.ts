import { utils } from '@/utils';
import { Ref, watch } from 'vue';

export function useInputOption(
    options: Ref<any[]>,
    optionLabel: Ref<string>,
    optionValue: Ref<string>,
    onClear: () => void,
) {
    function getOptionLabel(option: any) {
        if (typeof option === 'object') {
            if (optionLabel.value) {
                return option[optionLabel.value];
            } else {
                return JSON.stringify(option);
            }
        }

        return option + '';
    }

    function getOptionValue(option: any) {
        if (typeof option === 'object' && optionValue.value) {
            return option[optionValue.value];
        }

        return option;
    }

    watch(options, (newOptions, oldOptions) => {
        if (utils.object.isEqual(newOptions, oldOptions)) {
            return;
        }

        onClear();
    });

    return {
        getOptionLabel,
        getOptionValue,
    };
}
