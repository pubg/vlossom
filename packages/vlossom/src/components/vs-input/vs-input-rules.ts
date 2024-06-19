import { Ref } from 'vue';
import { InputType, InputValueType } from './types';

export function useVsInputRules(required: Ref<boolean>, max: Ref<number>, min: Ref<number>, type: Ref<InputType>) {
    function requiredCheck(v: InputValueType) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValueType) {
        if (type.value === InputType.Number && typeof v === 'number' && v > max.value) {
            return 'max value: ' + max.value;
        }

        if (type.value !== InputType.Number && typeof v === 'string' && v.length > max.value) {
            return 'max length: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValueType) {
        if (type.value === InputType.Number && typeof v === 'number' && v < min.value) {
            return 'min value: ' + min.value;
        }

        if (type.value !== InputType.Number && typeof v === 'string' && v.length < min.value) {
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
