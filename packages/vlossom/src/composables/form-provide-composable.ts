import { Ref, ref } from 'vue';

import type { VsFormProvide } from '@/declaration';

export function useFormProvide() {
    const labelObj: Ref<Record<string, string>> = ref({});
    const changedObj: Ref<Record<string, boolean>> = ref({});
    const validObj: Ref<Record<string, boolean>> = ref({});
    const validateFlag = ref(false);
    const clearFlag = ref(false);

    function updateLabel(id: string, label: string) {
        labelObj.value[id] = label;
    }

    function updateChanged(id: string, changed: boolean) {
        changedObj.value[id] = changed;
    }

    function updateValid(id: string, valid: boolean) {
        validObj.value[id] = valid;
    }

    function removeFromForm(id: string) {
        delete labelObj.value[id];
        delete changedObj.value[id];
        delete validObj.value[id];
    }

    function getDefaultFormProvide(): VsFormProvide {
        return {
            labelObj,
            changedObj,
            validObj,
            validateFlag,
            clearFlag,
            updateLabel,
            updateChanged,
            updateValid,
            removeFromForm,
        };
    }

    return {
        labelObj,
        changedObj,
        validObj,
        validateFlag,
        clearFlag,
        updateLabel,
        updateChanged,
        updateValid,
        removeFromForm,
        getDefaultFormProvide,
    };
}
