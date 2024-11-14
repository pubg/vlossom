<template>
    <vs-container
        tag="form"
        :class="['vs-form', colorSchemeClass]"
        :grid="grid"
        :column-gap="columnGap"
        :row-gap="rowGap"
        :autocomplete="autocomplete ? 'on' : 'off'"
    >
        <slot />
    </vs-container>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, provide, toRefs, watch } from 'vue';
import { ColorScheme, VS_FORM, VsComponent, type VsFormProvide } from '@/declaration';
import { useColorScheme, useFormProvide } from '@/composables';
import { getGridProps } from '@/models';
import VsContainer from '@/components/vs-container/VsContainer.vue';

const name = VsComponent.VsForm;
export default defineComponent({
    name,
    components: { VsContainer },
    props: {
        ...getGridProps(name),
        colorScheme: { type: String as PropType<ColorScheme> },
        autocomplete: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        // v-model
        changed: { type: Boolean, default: false },
        valid: { type: Boolean, default: true },
    },
    emits: ['update:changed', 'update:valid', 'error'],
    expose: ['validate', 'clear'],
    setup(props, { emit }) {
        const { colorScheme, disabled, readonly } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { validObj, setDisabled, setReadonly, changedObj, validateFlag, clearFlag, getDefaultFormProvide } =
            useFormProvide();

        provide<VsFormProvide>(VS_FORM, getDefaultFormProvide());

        const isValid = computed(() => Object.values(validObj.value).every((v) => v));
        const isChanged = computed(() => Object.values(changedObj.value).some((v) => v));

        async function validate() {
            validateFlag.value = !validateFlag.value;
            await nextTick();

            if (!isValid.value) {
                // on error callback with invalid labels
                const invalidIds = Object.keys(validObj.value).filter((id) => !validObj.value[id]);
                emit('error', invalidIds);
            }

            return isValid.value;
        }

        function clear() {
            clearFlag.value = !clearFlag.value;
        }

        watch(disabled, setDisabled, { immediate: true });

        watch(readonly, setReadonly, { immediate: true });

        watch(isValid, (valid) => {
            emit('update:valid', valid);
        });

        watch(isChanged, (changed) => {
            emit('update:changed', changed);
        });

        return {
            colorSchemeClass,
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

<style lang="scss" src="./VsForm.scss" />
