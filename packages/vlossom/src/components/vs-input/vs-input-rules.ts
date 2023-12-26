import { Ref } from 'vue';
import { InputType, InputValue } from './VsInput.vue';

export function useVsInputRules(
    required: Ref<boolean>,
    max: Ref<number | null>,
    min: Ref<number | null>,
    type: Ref<InputType>,
) {
    function requiredCheck(v: InputValue) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValue) {
        if (max.value === null) {
            return '';
        }

        if (type.value === InputType.TEXT && typeof v === 'string' && v.length > max.value) {
            return 'max length: ' + max.value;
        }

        if (type.value === InputType.NUMBER && typeof v === 'number' && v > max.value) {
            return 'max value: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValue) {
        if (min.value === null) {
            return '';
        }

        if (type.value === InputType.TEXT && typeof v === 'string' && v.length < min.value) {
            return 'min length: ' + min.value;
        }

        if (type.value === InputType.NUMBER && typeof v === 'number' && v < min.value) {
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
