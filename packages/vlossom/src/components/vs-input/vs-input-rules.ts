import { Ref } from 'vue';
import { InputType, InputValue } from './VsInput.vue';

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

        if (type.value === InputType.TEXT && typeof v === 'string' && v.length > limit) {
            return 'max length: ' + max.value;
        }

        if (type.value === InputType.NUMBER && typeof v === 'number' && v > limit) {
            return 'max value: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValue) {
        const limit = Number(min.value);

        if (isNaN(limit) || limit < Number.MIN_SAFE_INTEGER) {
            return '';
        }

        if (type.value === InputType.TEXT && typeof v === 'string' && v.length < limit) {
            return 'min length: ' + min.value;
        }

        if (type.value === InputType.NUMBER && typeof v === 'number' && v < limit) {
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
