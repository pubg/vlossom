import { Ref } from 'vue';
import { InputValue } from './VsInput.vue';
import { InputType } from './types';

export function useVsInputRules(
    required: Ref<boolean>,
    max: Ref<number | string>,
    min: Ref<number | string>,
    type: Ref<string>,
) {
    function requiredCheck(v: InputValue) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValue) {
        const limit = Number(max.value);

        if (isNaN(limit) || limit > Number.MAX_SAFE_INTEGER) {
            return '';
        }

        if (type.value === InputType.Text && typeof v === 'string' && v.length > limit) {
            return 'max length: ' + max.value;
        }

        if (type.value === InputType.Number && typeof v === 'number' && v > limit) {
            return 'max value: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValue) {
        const limit = Number(min.value);

        if (isNaN(limit) || limit < Number.MIN_SAFE_INTEGER) {
            return '';
        }

        if (type.value === InputType.Text && typeof v === 'string' && v.length < limit) {
            return 'min length: ' + min.value;
        }

        if (type.value === InputType.Number && typeof v === 'number' && v < limit) {
            return 'min value: ' + min.value;
        }

        return '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
