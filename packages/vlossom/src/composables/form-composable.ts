import { Ref, inject, onBeforeUnmount, ref, watch } from 'vue';
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
    const chagedObj = inject<Ref<Record<string, boolean>>>('changedObj', ref({}));
    const validObj = inject<Ref<Record<string, boolean>>>('validObj', ref({}));
    const validateFlag = inject<Ref<boolean>>('validateFlag', ref(false));
    const clearFlag = inject<Ref<boolean>>('clearFlag', ref(false));

    watch(
        label,
        () => {
            if (label.value) {
                labelObj.value[id] = label.value;
            }
        },
        { immediate: true },
    );

    watch(
        changed,
        () => {
            chagedObj.value[id] = changed.value;
        },
        { immediate: true },
    );

    watch(
        valid,
        () => {
            validObj.value[id] = valid.value;
        },
        { immediate: true },
    );

    watch(validateFlag, validate);

    watch(clearFlag, () => {
        clear();
        changed.value = false;
    });

    onBeforeUnmount(() => {
        delete labelObj.value[id];
        delete chagedObj.value[id];
        delete validObj.value[id];
    });

    return {
        id,
    };
}
