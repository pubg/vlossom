import { Ref } from 'vue';

export function useVsSelectRules(
    required: Ref<boolean>,
    max: Ref<number | string>,
    min: Ref<number | string>,
    multiple: Ref<boolean>,
) {
    function requiredCheck(v: any) {
        if (!required.value) {
            return '';
        }

        if (multiple.value) {
            return v && v.length > 0 ? '' : 'required';
        } else {
            return v ? '' : 'required';
        }
    }

    function maxCheck(v: any) {
        const limit = Number(max.value);
        if (multiple.value) {
            return v && v.length > limit ? 'max number of items: ' + max.value : '';
        }

        return '';
    }

    function minCheck(v: any) {
        const limit = Number(min.value);
        if (multiple.value) {
            return v && v.length < limit ? 'min number of items: ' + min.value : '';
        }

        return '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
