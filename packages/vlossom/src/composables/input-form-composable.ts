import { Ref, inject, onMounted, onBeforeUnmount, watch } from 'vue';
import { VS_FORM, VsFormProvide } from '@/declaration';
import { useFormProvide } from './form-provide-composable';

export function useInputForm(
    id: Ref<string>,
    valid: Ref<boolean>,
    changed: Ref<boolean>,
    validate: () => boolean,
    clear: () => void,
) {
    const { disabled, readonly, validateFlag, clearFlag, updateChanged, updateValid, removeFromForm } =
        inject<VsFormProvide>(
            VS_FORM,
            useFormProvide().getDefaultFormProvide(), // for no provide error
        );

    watch(changed, () => {
        updateChanged(id.value, changed.value);
    });

    watch(valid, () => {
        updateValid(id.value, valid.value);
    });

    watch(validateFlag, validate);

    watch(clearFlag, clear);

    onMounted(() => {
        updateChanged(id.value, changed.value);
        updateValid(id.value, valid.value);
    });

    watch(id, (newId, oldId) => {
        removeFromForm(oldId);
        updateChanged(newId, changed.value);
        updateValid(newId, valid.value);
    });

    onBeforeUnmount(() => {
        removeFromForm(id.value);
    });

    return {
        formDisabled: disabled,
        formReadonly: readonly,
    };
}
