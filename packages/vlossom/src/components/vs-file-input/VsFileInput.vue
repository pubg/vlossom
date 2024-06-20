<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
            :disabled="computedDisabled"
            :messages="computedMessages"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="label || $slots['label']">
                <slot name="label" />
            </template>

            <div
                :class="['vs-file-input', `vs-${computedColorScheme}`, { ...classObj }, stateClasses]"
                :style="computedStyleSet"
                @dragenter.stop="setDragging(true)"
                @dragleave.stop="setDragging(false)"
                @drop.stop="setDragging(false)"
            >
                <div class="attach-file-icon">
                    <vs-icon icon="attachFile" :size="dense ? 18 : 22" />
                </div>
                <div class="label-box">
                    <div :class="['label-wrap', { placeholder: placeholder && !hasValue }]">
                        <template v-if="dragging">{{ dropPlaceholder }}</template>
                        <template v-else-if="placeholder && !hasValue">{{ placeholder }}</template>
                        <template v-else-if="hasValue">{{ fileLabel }}</template>
                    </div>
                </div>

                <input
                    ref="fileInputRef"
                    :id="id"
                    type="file"
                    :name="name"
                    :disabled="computedDisabled"
                    :readonly="computedReadonly"
                    :required="required"
                    :multiple="multiple"
                    :accept="accept"
                    @change.stop="updateValue($event)"
                    @focus.stop="onFocus"
                    @blur.stop="onBlur"
                />

                <button
                    v-if="!noClear && hasValue && !computedReadonly && !computedDisabled"
                    class="clear-button"
                    aria-hidden="true"
                    tabindex="-1"
                    @click.stop="onClear()"
                >
                    <vs-icon icon="close" :size="dense ? 14 : 16" />
                </button>
            </div>

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps, getInputProps, useInput, useStateClass } from '@/composables';
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
        styleSet: { type: [String, Object] as PropType<string | VsFileInputStyleSet> },
        accept: { type: String, default: '' },
        dense: { type: Boolean, default: false },
        dropPlaceholder: { type: String, default: 'Drop file here...' },
        multiple: { type: Boolean, default: false },
        // v-model
        modelValue: { type: [Object, Array] as PropType<InputValueType>, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate', 'focus', 'blur'],
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
            state,
            noDefaultRules,
        } = toRefs(props);

        const fileInputRef: Ref<HTMLInputElement | null> = ref(null);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsFileInputStyleSet>(name, styleSet);

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

        function correctEmptyValue() {
            const isArrayInputValue = Array.isArray(inputValue.value);
            if (multiple.value) {
                if (fileInputRef.value) {
                    fileInputRef.value.value = '';
                }
                inputValue.value = isArrayInputValue ? inputValue.value : [];
            } else {
                if (fileInputRef.value) {
                    fileInputRef.value.value = '';
                }
                inputValue.value = isArrayInputValue ? null : inputValue.value;
            }
        }

        const { computedMessages, computedState, computedDisabled, computedReadonly, shake, validate, clear, id } =
            useInput(context, {
                inputValue,
                modelValue,
                label,
                disabled,
                readonly,
                messages,
                rules,
                defaultRules: [requiredCheck],
                noDefaultRules,
                state,
                callbacks: {
                    onMounted: correctEmptyValue,
                    onChange: correctEmptyValue,
                    onClear,
                },
            });

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: computedDisabled.value,
            readonly: computedReadonly.value,
            dragging: dragging.value,
        }));

        const { stateClasses } = useStateClass(computedState);

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = Array.from(target.files || []);

            if (multiple.value) {
                inputValue.value = targetValue;
            } else {
                inputValue.value = targetValue[0] || null;
            }
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        function focus() {
            fileInputRef.value?.focus();
        }

        function blur() {
            fileInputRef.value?.blur();
        }

        const dragging = ref(false);

        function setDragging(value: boolean) {
            dragging.value = value;
        }

        return {
            id,
            fileInputRef,
            classObj,
            computedColorScheme,
            computedStyleSet,
            inputValue,
            fileLabel,
            updateValue,
            hasValue,
            computedMessages,
            computedDisabled,
            computedReadonly,
            shake,
            onClear,
            clear,
            validate,
            onFocus,
            onBlur,
            focus,
            blur,
            dragging,
            setDragging,
            stateClasses,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsFileInput.scss" />
