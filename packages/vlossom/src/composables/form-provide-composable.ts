import { Ref, ref } from 'vue';

import type { VsFormProvide } from '@/declaration';

export function useFormProvide() {
    const disabled = ref(false);
    const readonly = ref(false);
    const changedObj: Ref<Record<string, boolean>> = ref({});
    const validObj: Ref<Record<string, boolean>> = ref({});
    const validateFlag = ref(false);
    const clearFlag = ref(false);

    function setDisabled(value: boolean) {
        disabled.value = value;
    }

    function setReadonly(value: boolean) {
        readonly.value = value;
    }

    function updateChanged(id: string, changed: boolean) {
        changedObj.value[id] = changed;
    }

    function updateValid(id: string, valid: boolean) {
        validObj.value[id] = valid;
    }

    function removeFromForm(id: string) {
        delete changedObj.value[id];
        delete validObj.value[id];
    }

    function getDefaultFormProvide(): VsFormProvide {
        return {
            disabled,
            readonly,
            changedObj,
            validObj,
            validateFlag,
            clearFlag,
            updateChanged,
            updateValid,
            removeFromForm,
        };
    }

    return {
        disabled,
        readonly,
        changedObj,
        validObj,
        validateFlag,
        clearFlag,
        setDisabled,
        setReadonly,
        updateChanged,
        updateValid,
        removeFromForm,
        getDefaultFormProvide,
    };
}
