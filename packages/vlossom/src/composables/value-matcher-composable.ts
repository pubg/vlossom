import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

export function useValueMatcher(
    multiple: Ref<boolean>,
    inputValue: Ref<any>,
    trueValue: Ref<any>,
    falseValue: Ref<any>,
) {
    const isArrayValue = computed(() => Array.isArray(inputValue.value));
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
        return utils.object.isEqual(inputValue.value, trueValue.value) ? trueValue.value : falseValue.value;
    }

    function getClearedValue() {
        if (isMultipleValue.value) {
            return inputValue.value.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
        }
        return falseValue.value;
    }

    function getUpdatedValue(isTruthy: boolean, currentValue: any) {
        if (isMultipleValue.value) {
            if (isTruthy) {
                return [...currentValue, trueValue.value];
            }
            return currentValue.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
        }

        return isTruthy ? trueValue.value : falseValue.value;
    }

    return {
        isArrayValue,
        isMatched,
        getInitialValue,
        getClearedValue,
        getUpdatedValue,
    };
}
