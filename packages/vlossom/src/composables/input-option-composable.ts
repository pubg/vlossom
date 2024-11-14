import { watch, ref, type Ref } from 'vue';
import { utils } from '@/utils';

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
                const label = utils.object.get(option, optionLabel.value);

                if (!label) {
                    utils.log.error(
                        'option-label',
                        `${optionLabel.value} is not found in option: ${JSON.stringify(option)}`,
                    );

                    return JSON.stringify(option);
                }

                if (typeof label === 'string') {
                    return label;
                }

                return JSON.stringify(label);
            } else {
                return JSON.stringify(option);
            }
        }

        return option + '';
    }

    function getOptionValue(option: any) {
        if (utils.object.isPlainObject(option) && optionValue.value) {
            const value = utils.object.get(option, optionValue.value);

            if (value === undefined) {
                utils.log.error(
                    'option-value',
                    `${optionValue.value} is not found in option: ${JSON.stringify(option)}`,
                );

                return option;
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
