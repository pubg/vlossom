import { utils } from '@/utils';
import { PropType, Ref, watch } from 'vue';

export function getInputOptionProps() {
    return {
        options: { type: Array as PropType<any[]>, required: true, default: () => [] },
        optionLabel: { type: String, default: '' },
        optionValue: { type: String, default: '' },
    };
}

export function useInputOption(
    options: Ref<any[]>,
    optionLabel: Ref<string>,
    optionValue: Ref<string>,
    callbacks: {
        onClear: () => void;
    },
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

        callbacks.onClear();
    });

    return {
        getOptionLabel,
        getOptionValue,
    };
}
