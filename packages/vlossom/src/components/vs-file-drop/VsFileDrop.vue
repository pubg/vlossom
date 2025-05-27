<template>
    <vs-input-wrapper v-show="visible" :id="id" :required="required">
        <div :class="['vs-file-drop', colorSchemeClass, classObj]" :style="computedStyleSet">
            <input ref="fileDropRef" class="vs-file-drop-ref" :id="id" type="file" :name="name" :required="required" />
        </div>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref, toRefs } from 'vue';
import { VsComponent, type ColorScheme } from '@/declaration';
import { getInputProps } from '@/models';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsInputWrapper } from '@/components';

import type { InputValueType, VsFileDropStyleSet } from './types';

const name = VsComponent.VsFileDrop;
export default defineComponent({
    name,
    components: { VsInputWrapper },
    props: {
        ...getInputProps<InputValueType>(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileDropStyleSet> },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: null },
    },
    emits: ['update:modelValue'],
    setup(props) {
        const { colorScheme, styleSet, modelValue } = toRefs(props);

        const fileDropRef: Ref<HTMLInputElement | null> = ref(null);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileDropStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const classObj = computed(() => ({}));

        return {
            fileDropRef,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
        };
    },
});
</script>

<style lang="scss"></style>
