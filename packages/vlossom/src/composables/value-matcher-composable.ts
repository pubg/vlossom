import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

export function useValueMatcher(
    multiple: Ref<boolean>,
    modelValue: Ref<any>,
    inputValue: Ref<any>,
    trueValue: Ref<any>,
    falseValue: Ref<any>,
) {
    const isArrayValue = computed(() => Array.isArray(modelValue.value));
    const isMultipleValue = computed(() => multiple.value && isArrayValue.value);

    const isMatched: ComputedRef<boolean> = computed(() => {
        if (isMultipleValue.value) {
            return inputValue.value.some((v: any) => utils.object.isEqual(v, trueValue.value));
        }

        return utils.object.isEqual(inputValue.value, trueValue.value);
    });

    function getInitialValue() {
        if (isMultipleValue.value) {
            return inputValue.value;
        }
        return utils.object.isEqual(modelValue.value, trueValue.value) ? trueValue.value : falseValue.value;
    }

    function getClearedValue() {
        if (isMultipleValue.value) {
            return inputValue.value.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
        }
        return falseValue.value;
    }

    function getChangedValue(toggled: boolean, value: any) {
        if (isMultipleValue.value) {
            if (toggled) {
                return [...value, trueValue.value];
            }
            return value.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
        }

        return toggled ? trueValue.value : falseValue.value;
    }

    return {
        isArrayValue,
        isMatched,
        getInitialValue,
        getClearedValue,
        getChangedValue,
    };
}
