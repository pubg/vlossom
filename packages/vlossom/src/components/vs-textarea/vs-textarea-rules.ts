import { Ref } from 'vue';
import { InputValueType } from './types';

export function useVsTextareaRules(required: Ref<boolean>, max: Ref<number>, min: Ref<number>) {
    function requiredCheck(v: InputValueType) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValueType) {
        if (typeof v === 'string' && v.length > max.value) {
            return 'max length: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValueType) {
        if (typeof v === 'string' && v.length < min.value) {
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
