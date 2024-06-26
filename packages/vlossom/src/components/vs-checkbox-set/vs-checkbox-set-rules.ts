import { Ref } from 'vue';

export function useVsCheckboxSetRules(required: Ref<boolean>, max: Ref<number | string>, min: Ref<number | string>) {
    function requiredCheck(v: any[]) {
        return required.value && v && v.length === 0 ? 'required' : '';
    }

    function maxCheck(v: any[]) {
        const limit = Number(max.value);
        return v && v.length > limit ? 'max number of items: ' + max.value : '';
    }

    function minCheck(v: any[]) {
        const limit = Number(min.value);
        return v && v.length < limit ? 'min number of items: ' + min.value : '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
