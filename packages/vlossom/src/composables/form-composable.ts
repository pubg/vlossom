import { Ref, inject, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';
import { stringUtil } from '@/utils';

export function useFormComposable(
    label: Ref<string>,
    valid: Ref<boolean>,
    changed: Ref<boolean>,
    validate: () => boolean,
    clear: () => void,
) {
    const id = stringUtil.createID();

    const labelObj = inject<Ref<Record<string, string>>>('labelObj', ref({}));
    const changedObj = inject<Ref<Record<string, boolean>>>('changedObj', ref({}));
    const validObj = inject<Ref<Record<string, boolean>>>('validObj', ref({}));
    const validateFlag = inject<Ref<boolean>>('validateFlag', ref(false));
    const clearFlag = inject<Ref<boolean>>('clearFlag', ref(false));

    watch(label, () => {
        if (label.value) {
            labelObj.value[id] = label.value;
        }
    });

    watch(changed, () => {
        changedObj.value[id] = changed.value;
    });

    watch(valid, () => {
        validObj.value[id] = valid.value;
    });

    watch(validateFlag, validate);

    watch(clearFlag, () => {
        clear();
        changed.value = false;
    });

    onBeforeMount(() => {
        labelObj.value[id] = label.value;
        changedObj.value[id] = changed.value;
        validObj.value[id] = valid.value;
    });

    onBeforeUnmount(() => {
        delete labelObj.value[id];
        delete changedObj.value[id];
        delete validObj.value[id];
    });

    return {
        id,
    };
}
