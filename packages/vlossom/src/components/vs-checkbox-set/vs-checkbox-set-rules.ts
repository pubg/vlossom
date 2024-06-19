import { Ref } from 'vue';

export function useVsCheckboxSetRules(required: Ref<boolean>, max: Ref<number>, min: Ref<number>) {
    function requiredCheck(v: any[]) {
        return required.value && v && v.length === 0 ? 'required' : '';
    }

    function maxCheck(v: any[]) {
        return v && v.length > max.value ? 'max number of items: ' + max.value : '';
    }

    function minCheck(v: any[]) {
        return v && v.length < min.value ? 'min number of items: ' + min.value : '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
