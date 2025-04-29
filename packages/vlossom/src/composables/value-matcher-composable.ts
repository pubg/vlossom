import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

export function useValueMatcher(
    multiple: Ref<boolean>,
    inputValue: Ref<any>,
    trueValue: Ref<any>,
    falseValue: Ref<any>,
) {
    const isNotArrayValue = computed(() => !Array.isArray(inputValue.value));

    function getArrayValue() {
        return isNotArrayValue.value ? [] : inputValue.value;
    }

    function isValueEqual(a: any, b: any) {
        return utils.object.isEqual(a, b);
    }

    function isValueExistAtArray(arrayValue: any[]) {
        return arrayValue.some((v: any) => isValueEqual(v, trueValue.value));
    }

    const isMatched: ComputedRef<boolean> = computed(() => {
        if (multiple.value) {
            if (isNotArrayValue.value) {
                return false;
            }
            return isValueExistAtArray(inputValue.value);
        }

        return isValueEqual(inputValue.value, trueValue.value);
    });

    function getInitialValue() {
        if (multiple.value) {
            return getArrayValue();
        }

        return isValueEqual(inputValue.value, trueValue.value) ? trueValue.value : falseValue.value;
    }

    function addTrueValue() {
        if (!multiple.value) {
            return;
        }

        if (isNotArrayValue.value) {
            utils.log.warning('vaalue-matcher', 'modelValue is not array');
            return;
        }

        if (isValueExistAtArray(inputValue.value)) {
            return;
        }
        inputValue.value.push(trueValue.value);
    }

    function getUpdatedValue(isTruthy: boolean) {
        if (multiple.value) {
            const arrayValue = getArrayValue();
            if (isTruthy) {
                if (isValueExistAtArray(arrayValue)) {
                    return arrayValue;
                }
                return [...arrayValue, trueValue.value];
            }
            return arrayValue.filter((v: any) => !isValueEqual(v, trueValue.value));
        }

        return isTruthy ? trueValue.value : falseValue.value;
    }

    function getClearedValue() {
        if (multiple.value) {
            return [];
        }

        return falseValue.value;
    }

    return {
        isMatched,
        getInitialValue,
        getUpdatedValue,
        getClearedValue,
        addTrueValue,
    };
}
