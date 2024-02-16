<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div
                :class="['vs-file-input', `vs-${computedColorScheme}`, { ...classObj }]"
                :style="computedStyleSet"
                @dragenter="setDragging(true)"
                @dragleave="setDragging(false)"
                @drop="setDragging(false)"
            >
                <div class="file-input-container">
                    <div class="attach-file-icon">
                        <vs-icon icon="attachFile" :size="dense ? 16 : 20" />
                    </div>

                    <div class="label-box">
                        <span v-if="dragging">{{ dropPlaceholder }}</span>
                        <span v-else-if="placeholder && !hasValue" class="placeholder">{{ placeholder }}</span>
                        <span v-else-if="hasValue" class="file-label">{{ fileLabel }}</span>
                    </div>
                </div>

                <input
                    ref="fileInputRef"
                    :id="id"
                    type="file"
                    :name="name"
                    :disabled="disabled"
                    :readonly="readonly"
                    :required="required"
                    :multiple="multiple"
                    :accept="accept"
                    @change="updateValue($event)"
                    @focus="onFocus"
                    @blur="onBlur"
                />

                <button
                    v-if="!noClear && hasValue && !readonly && !disabled"
                    class="clear-button"
                    @click.stop="onClear()"
                >
                    <vs-icon icon="close" :size="dense ? 16 : 20" />
                </button>
            </div>

            <template #messages v-if="!noMsg">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsIcon } from '@/icons';

import type { InputValueType, VsFileInputStyleSet } from './types';

const name = VsComponent.VsFileInput;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType, []>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFileInputStyleSet>, default: '' },
        accept: { type: String, default: '' },
        dense: { type: Boolean, default: false },
        dropPlaceholder: { type: String, default: 'Drop file here...' },
        multiple: { type: Boolean, default: false },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            dense,
            disabled,
            label,
            messages,
            modelValue,
            multiple,
            readonly,
            required,
            rules,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileInputStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: disabled.value,
            dragging: dragging.value,
            readonly: readonly.value,
        }));

        const inputValue = ref(modelValue.value);

        const hasValue = computed(() => {
            if (Array.isArray(inputValue.value)) {
                return inputValue.value.length > 0;
            } else {
                return !!inputValue.value;
            }
        });

        const fileLabel = computed(() => {
            if (!hasValue.value) {
                return '';
            }

            const firstFileName = Array.isArray(inputValue.value) ? inputValue.value[0].name : inputValue.value?.name;

            if (!firstFileName) {
                return '';
            }

            return Array.isArray(inputValue.value)
                ? `${firstFileName} (+ ${inputValue.value.length - 1} files)`
                : firstFileName;
        });

        function requiredCheck() {
            return required.value && !hasValue.value ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const fileInputRef = ref<HTMLInputElement | null>(null);

        function onClear() {
            if (fileInputRef.value) {
                fileInputRef.value.value = '';
            }

            if (multiple.value) {
                inputValue.value = [];
            } else {
                inputValue.value = null;
            }
        }

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    if (multiple.value && !Array.isArray(inputValue.value)) {
                        inputValue.value = [];
                    } else if (!multiple.value && Array.isArray(inputValue.value)) {
                        inputValue.value = null;
                    }
                },
                onClear,
            },
        });

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            if (multiple.value) {
                inputValue.value = targetValue;
            } else {
                inputValue.value = targetValue[0] || null;
            }
        }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
        }

        const dragging = ref(false);

        function setDragging(value: boolean) {
            dragging.value = value;
        }

        return {
            id,
            classObj,
            computedColorScheme,
            computedStyleSet,
            inputValue,
            fileLabel,
            fileInputRef,
            updateValue,
            hasValue,
            computedMessages,
            shake,
            onClear,
            clear,
            validate,
            onFocus,
            onBlur,
            dragging,
            setDragging,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsFileInput.scss" />
