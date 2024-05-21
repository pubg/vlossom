import { ComputedRef, Ref, computed } from 'vue';
import { utils } from '@/utils';

export function useValueMatcher(
    multiple: Ref<boolean>,
    inputValue: Ref<any>,
    trueValue: Ref<any>,
    falseValue: Ref<any>,
) {
    const isNotArrayValue = computed(() => !Array.isArray(inputValue.value));

    const isMatched: ComputedRef<boolean> = computed(() => {
        if (multiple.value) {
            if (isNotArrayValue.value) {
                return false;
            }
            return inputValue.value.some((v: any) => utils.object.isEqual(v, trueValue.value));
        }

        return utils.object.isEqual(inputValue.value, trueValue.value);
    });

    function getInitialValue() {
        if (multiple.value) {
            if (isNotArrayValue.value) {
                return [];
            }
            return inputValue.value;
        }

        return utils.object.isEqual(inputValue.value, trueValue.value) ? trueValue.value : falseValue.value;
    }

    function getUpdatedValue(isTruthy: boolean) {
        if (multiple.value) {
            const arrayValue = isNotArrayValue.value ? [] : inputValue.value;
            if (isTruthy) {
                const isAlreadyExist = arrayValue.some((v: any) => utils.object.isEqual(v, trueValue.value));
                if (isAlreadyExist) {
                    return arrayValue;
                }
                return [...arrayValue, trueValue.value];
            }
            return arrayValue.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
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
    };
}
