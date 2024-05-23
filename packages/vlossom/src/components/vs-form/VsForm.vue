<template>
    <vs-container tag="form">
        <slot />
    </vs-container>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, provide, watch } from 'vue';
import { VS_FORM, VsComponent, type VsFormProvide } from '@/declaration';
import { useFormProvide } from '@/composables';
import VsContainer from '@/components/vs-container/VsContainer.vue';

export default defineComponent({
    name: VsComponent.VsForm,
    components: { VsContainer },
    props: {
        // v-model
        changed: { type: Boolean, default: false },
        valid: { type: Boolean, default: true },
    },
    emits: ['update:changed', 'update:valid', 'error'],
    expose: ['validate', 'clear'],
    setup(_, { emit }) {
        const { labelObj, validObj, changedObj, validateFlag, clearFlag, getDefaultFormProvide } = useFormProvide();

        provide<VsFormProvide>(VS_FORM, getDefaultFormProvide());

        const isValid = computed(() => Object.values(validObj.value).every((v) => v));
        const isChanged = computed(() => Object.values(changedObj.value).some((v) => v));

        async function validate() {
            validateFlag.value = !validateFlag.value;
            await nextTick();

            if (!isValid.value) {
                // on error callback with invalid labels
                const invalidIds = Object.keys(validObj.value).filter((id) => !validObj.value[id]);
                const invalidLabels = invalidIds.map((id) => labelObj.value[id]);
                emit('error', invalidLabels);
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
</script>
