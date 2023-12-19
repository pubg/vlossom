import { Ref, inject, onBeforeMount, onBeforeUnmount, watch } from 'vue';
import { stringUtil } from '@/utils';
import { VsFormProvide } from '@/declaration/types';
import { useFormProvide } from './form-provide-composable';

export function useInputForm(
    label: Ref<string>,
    valid: Ref<boolean>,
    changed: Ref<boolean>,
    validate: () => boolean,
    clear: () => void,
) {
    const id = stringUtil.createID();

    const { validateFlag, clearFlag, updateLabel, updateChanged, updateValid, removeFromForm } = inject<VsFormProvide>(
        'vs-form',
        useFormProvide().getFormProvide(), // for no provide error
    );

    watch(label, () => {
        updateLabel(id, label.value);
    });

    watch(changed, () => {
        updateChanged(id, changed.value);
    });

    watch(valid, () => {
        updateValid(id, valid.value);
    });

    watch(validateFlag, validate);

    watch(clearFlag, clear);

    onBeforeMount(() => {
        updateLabel(id, label.value);
        updateChanged(id, changed.value);
        updateValid(id, valid.value);
    });

    onBeforeUnmount(() => {
        removeFromForm(id);
    });

    return {
        id,
    };
}
