<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :id="computedId"
        :label="label"
        :required="required"
        :disabled="computedDisabled"
        :dense="dense"
        :messages="computedMessages"
        :no-message="noMessage"
        :shake="shake"
    >
        <template #label v-if="label || $slots['label']">
            <slot name="label" />
        </template>

        <div :class="['vs-input', colorSchemeClass, classObj, stateClasses]" :style="computedStyleSet">
            <div v-if="$slots['prepend']" class="vs-prepend">
                <slot name="prepend" />
            </div>

            <input
                ref="inputRef"
                :id="computedId"
                :type="type"
                :value="inputValue"
                :autocomplete="autocomplete ? 'on' : 'off'"
                :name="name"
                :disabled="computedDisabled"
                :readonly="computedReadonly"
                :aria-label="ariaLabel"
                :aria-required="required"
                :placeholder="placeholder"
                @input.stop="updateValue($event)"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
                @keyup.enter.stop="onEnter"
                @change.stop
            />

            <button
                v-if="!noClear && !computedReadonly && !computedDisabled"
                type="button"
                class="vs-clear-button"
                :class="{ show: inputValue }"
                :disabled="!inputValue"
                aria-label="Clear"
                tabindex="-1"
                @click.stop="clearWithFocus()"
            >
                <vs-icon icon="close" :size="dense ? 14 : 16" />
            </button>

            <div v-if="$slots['append']" class="vs-append">
                <slot name="append" />
            </div>
        </div>

        <template #messages v-if="!noMessage">
            <slot name="messages" />
        </template>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, useInput, useStringModifier, useStateClass } from '@/composables';
import { getInputProps, getResponsiveProps } from '@/models';
import { VsComponent, StringModifiers, type ColorScheme } from '@/declaration';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import { VsIcon } from '@/icons';
import { InputType } from './types';
import { useVsInputRules } from './vs-input-rules';

import type { InputValueType, VsInputStyleSet } from './types';
import { utils } from '@/utils';

const name = VsComponent.VsInput;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet> },
        autocomplete: { type: Boolean, default: false },
        max: {
            type: [Number, String],
            default: Number.MAX_SAFE_INTEGER,
            validator: (value: number | string) => utils.props.checkValidNumber(name, 'max', value),
        },
        min: {
            type: [Number, String],
            default: Number.MIN_SAFE_INTEGER,
            validator: (value: number | string) => utils.props.checkValidNumber(name, 'min', value),
        },
        type: { type: String as PropType<InputType>, default: 'text' },
        // v-model
        modelValue: {
            type: [String, Number] as PropType<InputValueType>,
            default: null,
        },
        modelModifiers: {
            type: Object as PropType<StringModifiers>,
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
    // expose: ['clear', 'validate', 'focus', 'blur', 'select'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            dense,
            disabled,
            type,
            modelValue,
            id,
            messages,
            readonly,
            required,
            rules,
            max,
            min,
            modelModifiers,
            state,
            noDefaultRules,
        } = toRefs(props);

        const { emit } = context;

        const inputValue: Ref<InputValueType> = ref(modelValue.value);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsInputStyleSet>(name, styleSet);

        const { modifyStringValue } = useStringModifier(modelModifiers);

        const { requiredCheck, maxCheck, minCheck } = useVsInputRules(required, max, min, type);

        const isNumberInput = computed(() => type.value === 'number');

        function convertValue(v: InputValueType | undefined): InputValueType {
            if (v === undefined || v === null || v === '') {
                return isNumberInput.value ? null : '';
            }

            if (isNumberInput.value) {
                return Number(v);
            }

            return modifyStringValue(v.toString());
        }

        function onClear() {
            inputValue.value = null;
        }

        const {
            computedId,
            computedMessages,
            computedState,
            computedDisabled,
            computedReadonly,
            shake,
            validate,
            clear,
        } = useInput(context, {
            inputValue,
            modelValue,
            id,
            disabled,
            readonly,
            messages,
            rules,
            defaultRules: [requiredCheck, maxCheck, minCheck],
            noDefaultRules,
            state,
            callbacks: {
                onMounted: () => {
                    inputValue.value = convertValue(inputValue.value);
                },
                onChange: () => {
                    inputValue.value = convertValue(inputValue.value);
                },
                onClear,
            },
        });

        const classObj = computed(() => ({
            'vs-dense': dense.value,
            'vs-disabled': computedDisabled.value,
            'vs-readonly': computedReadonly.value,
        }));

        const { stateClasses } = useStateClass(computedState);

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            inputValue.value = target.value || '';
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

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        function onEnter(e: KeyboardEvent) {
            emit('enter', e);
        }

        function clearWithFocus() {
            onClear();
            focus();
        }

        return {
            computedId,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            inputValue,
            updateValue,
            inputRef,
            computedMessages,
            computedDisabled,
            computedReadonly,
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
            stateClasses,
        };
    },
});
</script>

<style lang="scss" src="./VsInput.scss" />
