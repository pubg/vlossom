import { utils } from '@/utils';
import { PropType, Ref, watch } from 'vue';
import * as _ from 'lodash-es';

export function getInputOptionProps() {
    return {
        options: { type: Array as PropType<any[]>, required: true, default: () => [] },
        optionLabel: { type: String, default: '' },
        optionValue: { type: String, default: '' },
    };
}

export function useInputOption(
    inputValue: Ref<any>,
    options: Ref<any[]>,
    optionLabel: Ref<string>,
    optionValue: Ref<string>,
) {
    function getOptionLabel(option: any) {
        if (typeof option === 'object') {
            if (optionLabel.value) {
                const label = _.at(option, [optionLabel.value])[0];

                if (!label) {
                    console.error(
                        `optionLabel: ${optionLabel.value} is not found in option: ${JSON.stringify(option)}`,
                    );
                }

                return label || '';
            } else {
                return JSON.stringify(option);
            }
        }

        return option + '';
    }

    function getOptionValue(option: any) {
        if (typeof option === 'object' && optionValue.value) {
            const value = _.at(option, [optionValue.value])[0];

            if (!value) {
                console.error(`optionValue: ${optionValue.value} is not found in option: ${JSON.stringify(option)}`);
            }

            return value;
        }

        return option;
    }

    watch(options, (newOptions, oldOptions) => {
        if (utils.object.isEqual(newOptions, oldOptions)) {
            return;
        }

        if (Array.isArray(inputValue.value)) {
            inputValue.value = inputValue.value.filter((value) => {
                return newOptions.some((o) => {
                    return getOptionValue(o) === value;
                });
            });
        } else {
            const option = newOptions.find((o) => {
                return getOptionValue(o) === inputValue.value;
            });

            if (!option) {
                inputValue.value = null;
            }
        }
    });

    return {
        getOptionLabel,
        getOptionValue,
    };
}
