<template>
    <vs-input-wrapper
        v-show="visible"
        :id="id"
        :class="[classObj]"
        :required="required"
        @mouseenter.stop="onMouseEnter"
        @mouseleave.stop="onMouseLeave"
    >
        <div :class="['vs-file-drop', colorSchemeClass, classObj]" :style="computedStyleSet">
            <input ref="fileDropRef" class="vs-file-drop-ref" :id="id" type="file" :name="name" :required="required" />

            <slot>
                <div class="vs-file-drop-content">
                    <div class="vs-file-drop-placeholder">
                        <vs-icon icon="attachFile" size="40" />
                        <span>Drop files here or click to upload</span>
                    </div>
                </div>
            </slot>
        </div>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref, toRefs } from 'vue';
import { VsComponent, type ColorScheme } from '@/declaration';
import { getInputProps } from '@/models';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsInputWrapper } from '@/components';
import { VsIcon } from '@/icons';

import type { InputValueType, VsFileDropStyleSet } from './types';

const name = VsComponent.VsFileDrop;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType>(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileDropStyleSet> },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: null },
    },
    emits: ['update:modelValue'],
    setup(props) {
        const { colorScheme, styleSet, modelValue, disabled } = toRefs(props);

        const fileDropRef: Ref<HTMLInputElement | null> = ref(null);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileDropStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const hover = ref(false);

        const classObj = computed(() => ({
            'vs-hover': hover.value,
            'vs-disabled': disabled.value,
        }));

        function onMouseEnter() {
            if (disabled.value) {
                return;
            }

            hover.value = true;
        }

        function onMouseLeave() {
            if (disabled.value) {
                return;
            }

            hover.value = false;
        }

        return {
            fileDropRef,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            onMouseEnter,
            onMouseLeave,
        };
    },
});
</script>

<style lang="scss" src="./VsFileDrop.scss" />
