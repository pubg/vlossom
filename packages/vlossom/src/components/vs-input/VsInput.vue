<template>
    <vs-wrapper :width="width" :grid="grid">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
        >
            <div :class="['vs-input', `vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties">
                <button class="action-button prepend" v-if="hasPrepend" @click="$emit('prepend')">
                    <slot name="prepend-icon" />
                </button>

                <input
                    ref="inputRef"
                    :type="type"
                    :value="inputValue"
                    :disabled="disabled"
                    :readonly="readonly"
                    :placeholder="placeholder"
                    @input="updateValue($event)"
                    @focus="onFocus"
                    @blur="onBlur"
                    @keyup.enter="onEnter"
                />

                <button class="action-button append" v-if="hasAppend" @click="$emit('append')">
                    <slot name="append-icon" />
                </button>

                <button
                    v-if="!noClear && inputValue && !readonly && !disabled"
                    class="clear-button"
                    :class="{ number: type === InputType.NUMBER }"
                    @click.stop="clearWithFocus()"
                >
                    <close class="clear-icon" />
                </button>
            </div>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useCustomStyle, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';
import { useVsInputRules } from './vs-input-rules';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import Close from '@/assets/icons/close';

interface InputStyleSet {
    appendBackgroundColor: string;
    appendColor: string;
    backgroundColor: string;
    border: string;
    borderRadius: string;
    clearButtonColor: string;
    color: string;
    fontSize: string;
    height: string;
    prependBackgroundColor: string;
    prependColor: string;
}

export type VsInputStyleSet = Partial<InputStyleSet>;

export enum InputType {
    TEXT = 'text',
    NUMBER = 'number',
}

export type InputValue = string | number;

const name = VsComponent.VsInput;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, Close },
    props: {
        ...getInputProps<string | number>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        noClear: { type: Boolean, default: false },
        type: { type: String as PropType<InputType>, default: InputType.TEXT },
        max: { type: [Number, Object] as PropType<number | null>, default: null },
        min: { type: [Number, Object] as PropType<number | null>, default: null },
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
    expose: ['focus', 'blur', 'select', 'clear'],
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
            rules,
            required,
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

        const { customProperties } = useCustomStyle<VsInputStyleSet>(name, styleSet);

        function convertValue(v: InputValue | null | undefined): InputValue {
            if (!v) {
                return type.value === InputType.TEXT ? '' : 0;
            }

            if (type.value === InputType.TEXT) {
                return v.toString();
            } else {
                return Number(v);
            }
        }

        const inputValue: Ref<InputValue> = ref('');

        const { requiredCheck, maxCheck, minCheck } = useVsInputRules(required, max, min, type);

        const allRules = computed(() => [...rules.value, requiredCheck, maxCheck, minCheck]);

        function onClear() {
            const emptyValue = convertValue(null);
            inputValue.value = emptyValue;
        }

        const { computedMessages, shake } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    inputValue.value = convertValue(modelValue.value);

                    // response to null binding
                    if (!modelValue.value && modelValue.value !== convertValue(modelValue.value)) {
                        emit('update:modelValue', inputValue.value);
                    }
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
            classObj,
            computedColorScheme,
            customProperties,
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
            onFocus,
            onBlur,
            onEnter,
            clearWithFocus,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsInput.scss" />
