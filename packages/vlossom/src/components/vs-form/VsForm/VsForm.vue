<template>
    <div class="vs-form">
        <vs-container>
            <slot />
        </vs-container>
    </div>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, nextTick, provide, ref, watch } from 'vue';
import { VsComponent } from '@/declaration/types';
import VsContainer from '@/components/vs-container/VsContainer/VsContainer.vue';

export const name = VsComponent.VsForm;

const VsForm = defineComponent({
    name: 'vs-form',
    components: { VsContainer },
    props: {
        // v-model
        changed: { type: Boolean, default: false },
        valid: { type: Boolean, default: true },
    },
    emits: ['update:changed', 'update:valid'],
    expose: ['validate', 'clear'],
    setup(_, { emit }) {
        const labelObj: Ref<Record<string, string>> = ref({});
        const changedObj: Ref<Record<string, boolean>> = ref({});
        const validObj: Ref<Record<string, boolean>> = ref({});
        const validateFlag = ref(false);
        const clearFlag = ref(false);

        provide('labelObj', labelObj);
        provide('validObj', validObj);
        provide('changedObj', changedObj);
        provide('validateFlag', validateFlag);
        provide('clearFlag', clearFlag);

        const isValid = computed(() => Object.values(validObj.value).every((v) => v));
        const isChanged = computed(() => Object.values(changedObj.value).some((v) => v));

        async function validate() {
            validateFlag.value = !validateFlag.value;
            await nextTick();

            const invalidIds = Object.keys(validObj.value).filter((id) => !validObj.value[id]);
            const invalidLabels = invalidIds.map((id) => labelObj.value[id]).filter((label) => !!label);
            if (invalidLabels.length > 0) {
                // TODO: open error snackbar
            }
            return isValid.value;
        }

        function clear() {
            clearFlag.value = !clearFlag.value;
        }

        watch(isValid, (valid) => {
            emit('update:valid', valid);
        });

        watch(isChanged, (changed) => {
            emit('update:changed', changed);
        });

        return {
            labelObj,
            changedObj,
            validObj,
            validateFlag,
            clearFlag,
            isValid,
            isChanged,
            validate,
            clear,
        };
    },
});

export default VsForm;
export type VsFormInstance = InstanceType<typeof VsForm>;
</script>
