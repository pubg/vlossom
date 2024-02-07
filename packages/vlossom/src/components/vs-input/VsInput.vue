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

            <div :class="['vs-input', `vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet">
                <button class="action-button prepend" v-if="hasPrepend" @click="$emit('prepend')">
                    <slot name="prepend-icon" />
                </button>

                <input
                    ref="inputRef"
                    :id="id"
                    :type="type"
                    :value="inputValue"
                    :name="name"
                    :disabled="disabled"
                    :readonly="readonly"
                    :required="required"
                    :placeholder="placeholder"
                    @input="updateValue($event)"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keyup.enter="onEnter"
                    @change.stop
                />

                <button class="action-button append" v-if="hasAppend" @click="$emit('append')">
                    <slot name="append-icon" />
                </button>

                <button
                    v-if="!noClear && inputValue && !readonly && !disabled"
                    class="clear-button"
                    :class="{ number: type === InputType.Number }"
                    @click.stop="clearWithFocus()"
                >
                    <close-icon :size="dense ? 16 : 20" />
                </button>
            </div>

            <template #messages v-if="!noMsg">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { useVsInputRules } from './vs-input-rules';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { CloseIcon } from '@/icons';
import { InputType } from './types';

import type { VsInputStyleSet } from './types';

export type InputValue = string | number;

const name = VsComponent.VsInput;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, CloseIcon },
    props: {
        ...getInputProps<InputValue, []>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        type: { type: String as PropType<InputType | string>, default: InputType.Text },
        max: { type: [Number, String], default: Number.MAX_SAFE_INTEGER },
        min: { type: [Number, String], default: Number.MIN_SAFE_INTEGER },
        // v-model
        modelValue: { type: [String, Number], default: '' },
        modelModifiers: {
            type: Object as PropType<{ capitalize?: boolean; lower?: boolean; upper?: boolean }>,
            default: () => ({}),
        },
    },
    emits: [
        'update:modelValue',
        'update:changed',
        'update:valid',
        'change',
        'focus',
        'blur',
        'enter',
        'prepend',
        'append',
    ],
    expose: ['focus', 'blur', 'select', 'clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            dense,
            disabled,
            type,
            modelValue,
            label,
            messages,
            required,
            rules,
            max,
            min,
            modelModifiers,
        } = toRefs(props);

        const { slots, emit } = context;

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: disabled.value,
        }));

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsInputStyleSet>(name, styleSet);

        function convertValue(v: InputValue | null | undefined): InputValue {
            if (!v) {
                return type.value === InputType.Text ? '' : 0;
            }

            if (type.value === InputType.Text) {
                return v.toString();
            } else {
                return Number(v);
            }
        }

        const inputValue: Ref<InputValue> = ref(modelValue.value);

        const { requiredCheck, maxCheck, minCheck } = useVsInputRules(required, max, min, type);

        const allRules = computed(() => [...rules.value, requiredCheck, maxCheck, minCheck]);

        function onClear() {
            const emptyValue = convertValue(null);
            inputValue.value = emptyValue;
        }

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    inputValue.value = convertValue(modelValue.value);
                },
                onClear,
            },
        });

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = target.value || '';
            let converted = convertValue(targetValue);

            if (typeof converted === 'string' && Object.keys(modelModifiers.value).length > 0) {
                if (modelModifiers.value.capitalize) {
                    converted = converted.charAt(0).toUpperCase() + converted.slice(1);
                }

                if (modelModifiers.value.lower) {
                    converted = converted.toLowerCase();
                }

                if (modelModifiers.value.upper) {
                    converted = converted.toUpperCase();
                }
            }

            inputValue.value = converted;
        }

        const inputRef: Ref<HTMLInputElement | null> = ref(null);

        function focus() {
            inputRef.value?.focus();
        }

        function blur() {
            inputRef.value?.blur();
        }

        function select() {
            inputRef.value?.select();
        }

        const hasPrepend = computed(() => !!slots['prepend-icon']);
        const hasAppend = computed(() => !!slots['append-icon']);

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
        }

        function onEnter() {
            emit('enter');

            if (hasPrepend.value) {
                emit('prepend');
            }

            if (hasAppend.value) {
                emit('append');
            }
        }

        function clearWithFocus() {
            onClear();
            focus();
        }

        return {
            id,
            classObj,
            computedColorScheme,
            computedStyleSet,
            InputType,
            inputValue,
            updateValue,
            inputRef,
            hasPrepend,
            hasAppend,
            computedMessages,
            shake,
            focus,
            blur,
            select,
            clear,
            validate,
            onFocus,
            onBlur,
            onEnter,
            clearWithFocus,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsInput.scss" />
