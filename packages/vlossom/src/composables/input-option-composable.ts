import { watch, ref, type PropType, type Ref } from 'vue';
import { utils } from '@/utils';

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
    multiple = ref(false),
) {
    function getOptionLabel(option: any): string {
        if (utils.object.isPlainObject(option)) {
            if (optionLabel.value) {
                const label = utils.object.at(option, [optionLabel.value])[0];

                if (!label) {
                    utils.log.error(
                        'option-label',
                        `${optionLabel.value} is not found in option: ${JSON.stringify(option)}`,
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
        if (utils.object.isPlainObject(option) && optionValue.value) {
            const value = utils.object.at(option, [optionValue.value])[0];

            if (value === undefined || value === null) {
                utils.log.error(
                    'option-value',
                    `${optionValue.value} is not found in option: ${JSON.stringify(option)}`,
                );
            }

            return value;
        }

        return option;
    }

    watch(options, (newOptions, oldOptions) => {
        if (utils.object.isEqual(newOptions, oldOptions)) {
            return;
        }

        if (multiple.value && Array.isArray(inputValue.value)) {
            inputValue.value = inputValue.value.filter((value) => {
                return newOptions.some((o) => utils.object.isEqual(getOptionValue(o), value));
            });
        } else {
            const option = newOptions.find((o) => utils.object.isEqual(getOptionValue(o), inputValue.value));

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
