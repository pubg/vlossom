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
                :class="['vs-input', `vs-${computedColorScheme}`, { ...classObj }, stateClasses]"
                :style="computedStyleSet"
            >
                <div v-if="$slots['prepend']" class="prepend">
                    <slot name="prepend" />
                </div>

                <input
                    ref="inputRef"
                    :id="id"
                    :type="type"
                    :value="inputValue"
                    :autocomplete="autocomplete ? 'on' : 'off'"
                    :name="name"
                    :disabled="computedDisabled"
                    :readonly="computedReadonly"
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
                    class="clear-button"
                    :class="{ show: inputValue }"
                    :disabled="!inputValue"
                    aria-hidden="true"
                    tabindex="-1"
                    @click.stop="clearWithFocus()"
                >
                    <vs-icon icon="close" :size="dense ? 14 : 16" />
                </button>

                <div v-if="$slots['append']" class="append">
                    <slot name="append" />
                </div>
            </div>

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import {
    useColorScheme,
    useStyleSet,
    getResponsiveProps,
    getInputProps,
    useInput,
    useStringModifier,
    useStateClass,
} from '@/composables';
import { VsComponent, StringModifiers, type ColorScheme } from '@/declaration';
import { useVsInputRules } from './vs-input-rules';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsIcon } from '@/icons';
import { InputType } from './types';

import type { InputValueType, VsInputStyleSet } from './types';
import { utils } from '@/utils';

const name = VsComponent.VsInput;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType, []>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet> },
        autocomplete: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
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
        type: { type: String as PropType<InputType>, default: InputType.Text },
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
    expose: ['clear', 'validate', 'focus', 'blur', 'select'],
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

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsInputStyleSet>(name, styleSet);

        const { modifyStringValue } = useStringModifier(modelModifiers);

        const { requiredCheck, maxCheck, minCheck } = useVsInputRules(required, max, min, type);

        const isNumberInput = computed(() => type.value === InputType.Number);

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

        const { computedMessages, computedState, computedDisabled, computedReadonly, shake, validate, clear, id } =
            useInput(context, {
                inputValue,
                modelValue,
                label,
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
            dense: dense.value,
            disabled: computedDisabled.value,
            readonly: computedReadonly.value,
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

        function onEnter() {
            emit('enter');
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

<style lang="scss" scoped src="./VsInput.scss" />
