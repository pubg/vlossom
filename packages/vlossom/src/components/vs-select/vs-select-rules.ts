import { Ref } from 'vue';

export function useVsSelectRules(
    required: Ref<boolean>,
    max: Ref<number>,
    min: Ref<number>,
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
        if (multiple.value) {
            return v && v.length > max.value ? 'max number of items: ' + max.value : '';
        }

        return '';
    }

    function minCheck(v: any) {
        if (multiple.value) {
            return v && v.length < min.value ? 'min number of items: ' + min.value : '';
        }

        return '';
    }

    return {
        requiredCheck,
        maxCheck,
        minCheck,
    };
}
