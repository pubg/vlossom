<template>
    <vs-input-wrapper
        v-show="visible"
        :id="computedId"
        :class="classObj"
        :required="required"
        @mouseenter.stop="onMouseEnter"
        @mouseleave.stop="onMouseLeave"
    >
        <div :class="['vs-file-drop', colorSchemeClass, classObj]" :style="computedStyleSet">
            <input
                ref="fileDropRef"
                class="vs-file-drop-ref"
                :id="computedId"
                type="file"
                :name="name"
                :required="required"
                :accept="accept"
                :multiple="multiple"
                @change.stop="updateValue($event)"
            />

            <div class="vs-file-drop-content">
                <slot>
                    <div class="vs-file-drop-placeholder">
                        <vs-icon icon="attachFile" size="40" />
                        <span>Drop files here or click to upload</span>
                    </div>
                </slot>
            </div>
        </div>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref, toRefs } from 'vue';
import { VsComponent, type ColorScheme } from '@/declaration';
import { getInputProps } from '@/models';
import { useColorScheme, useInput, useStyleSet } from '@/composables';
import { VsInputWrapper } from '@/components';
import { VsIcon } from '@/icons';

import type { InputValueType, VsFileDropStyleSet } from './types';

const name = VsComponent.VsFileDrop;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType>(),
        accept: { type: String, default: '' },
        multiple: { type: Boolean, default: true },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileDropStyleSet> },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'change'],
    setup(props, context) {
        const { id, colorScheme, styleSet, modelValue, disabled, multiple } = toRefs(props);

        const fileDropRef: Ref<HTMLInputElement | null> = ref(null);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileDropStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const hover = ref(false);

        const { computedId, computedDisabled } = useInput(context, {
            inputValue,
            modelValue,
            id,
            disabled,
        });

        const classObj = computed(() => ({
            'vs-hover': hover.value,
            'vs-disabled': computedDisabled.value,
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

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            if (validateSingleFileUpload(targetValue)) {
                return;
            }

            if (multiple.value) {
                inputValue.value = targetValue;
            } else {
                inputValue.value = targetValue[0] || null;
            }
        }

        function validateSingleFileUpload(v: InputValueType): string {
            if (multiple.value) {
                return '';
            }
            if (Array.isArray(v) && v.length > 1) {
                return 'You can only upload one file';
            }
            return '';
        }

        return {
            fileDropRef,
            computedId,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            onMouseEnter,
            onMouseLeave,
            updateValue,
        };
    },
});
</script>

<style lang="scss" src="./VsFileDrop.scss" />
