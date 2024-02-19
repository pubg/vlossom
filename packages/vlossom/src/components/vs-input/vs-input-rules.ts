import { Ref } from 'vue';
import { InputType, InputValueType } from './types';

export function useVsInputRules(
    required: Ref<boolean>,
    max: Ref<number | string>,
    min: Ref<number | string>,
    type: Ref<InputType>,
) {
    function requiredCheck(v: InputValueType) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValueType) {
        const limit = Number(max.value);

        if (max.value === null || isNaN(limit) || limit > Number.MAX_SAFE_INTEGER) {
            return '';
        }

        if (type.value === InputType.Number && typeof v === 'number' && v > limit) {
            return 'max value: ' + max.value;
        }

        if (type.value !== InputType.Number && typeof v === 'string' && v.length > limit) {
            return 'max length: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValueType) {
        const limit = Number(min.value);

        if (min.value === null || isNaN(limit) || limit < Number.MIN_SAFE_INTEGER) {
            return '';
        }

        if (type.value === InputType.Number && typeof v === 'number' && v < limit) {
            return 'min value: ' + min.value;
        }

        if (type.value !== InputType.Number && typeof v === 'string' && v.length < limit) {
            return 'min length: ' + min.value;
        }

        return '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
