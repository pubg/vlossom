import { Ref } from 'vue';
import { InputValueType } from './types';

export function useVsTextareaRules(required: Ref<boolean>, max: Ref<number | string>, min: Ref<number | string>) {
    function requiredCheck(v: InputValueType) {
        if (required.value && v === '') {
            return 'required';
        }

        return '';
    }

    function maxCheck(v: InputValueType) {
        const limit = Number(max.value);

        if (isNaN(limit) || limit > Number.MAX_SAFE_INTEGER) {
            return '';
        }

        if (typeof v === 'string' && v.length > limit) {
            return 'max length: ' + max.value;
        }

        return '';
    }

    function minCheck(v: InputValueType) {
        const limit = Number(min.value);

        if (isNaN(limit) || limit < Number.MIN_SAFE_INTEGER) {
            return '';
        }

        if (typeof v === 'string' && v.length < limit) {
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
