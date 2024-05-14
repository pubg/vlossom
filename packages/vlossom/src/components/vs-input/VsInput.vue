<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
            :disabled="disabled"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
            :state="state"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div
                :class="['vs-input', `vs-${computedColorScheme}`, { ...classObj }, boxGlowByState]"
                :style="computedStyleSet"
            >
                <button
                    v-if="hasPrependButton"
                    type="button"
                    class="prepend"
                    aria-label="prepend-action"
                    @click.stop="$emit('prepend')"
                >
                    <slot name="prepend-button" />
                </button>

                <div v-if="hasPrependContent" class="prepend">
                    <slot name="prepend-content" />
                </div>

                <input
                    ref="inputRef"
                    :id="id"
                    :type="type"
                    :value="inputValue"
                    :name="name"
                    :disabled="disabled"
                    :readonly="readonly"
                    :aria-required="required"
                    :placeholder="placeholder"
                    @input.stop="updateValue($event)"
                    @focus.stop="onFocus"
                    @blur.stop="onBlur"
                    @keyup.enter.stop="onEnter"
                    @change.stop
                />

                <button
                    v-if="!noClear && !readonly && !disabled"
                    type="button"
                    class="clear-button"
                    :class="{ show: inputValue }"
                    :disabled="!inputValue"
                    aria-hidden="true"
                    tabindex="-1"
                    @click.stop="clearWithFocus()"
                >
                    <vs-icon icon="close" :size="dense ? 16 : 20" />
                </button>

                <div v-if="hasAppendContent" class="append">
                    <slot name="append-content" />
                </div>

                <button v-if="hasAppendButton" class="append" aria-label="append-action" @click.stop="$emit('append')">
                    <slot name="append-button" />
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
import {
    useColorScheme,
    useStyleSet,
    getResponsiveProps,
    getInputProps,
    useInput,
    useStringModifier,
    useStateClass,
} from '@/composables';
import { VsComponent, type ColorScheme, StringModifiers } from '@/declaration';
import { useVsInputRules } from './vs-input-rules';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsIcon } from '@/icons';
import { InputType } from './types';

import type { InputValueType, VsInputStyleSet } from './types';

const name = VsComponent.VsInput;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsIcon },
    props: {
        ...getInputProps<InputValueType, []>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet> },
        dense: { type: Boolean, default: false },
        max: { type: [Number, String], default: Number.MAX_SAFE_INTEGER },
        min: { type: [Number, String], default: Number.MIN_SAFE_INTEGER },
        type: { type: String as PropType<InputType>, default: InputType.Text },
        // v-model
        modelValue: { type: [String, Number] as PropType<InputValueType>, default: '' },
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
            state,
        } = toRefs(props);

        const { slots, emit } = context;

        const inputValue: Ref<InputValueType> = ref(modelValue.value);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsInputStyleSet>(name, styleSet);

        const { boxGlowByState } = useStateClass(state);

        const { modifyStringValue } = useStringModifier(modelModifiers);

        const { requiredCheck, maxCheck, minCheck } = useVsInputRules(required, max, min, type);

        const classObj = computed(() => ({
            dense: dense.value,
            disabled: disabled.value,
        }));

        const isNumberInput = computed(() => type.value === InputType.Number);

        function convertValue(v: InputValueType | undefined): InputValueType {
            if (!v) {
                return isNumberInput.value ? null : '';
            }

            if (isNumberInput.value) {
                return Number(v);
            }

            return v.toString();
        }

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

            if (typeof converted === 'string') {
                converted = modifyStringValue(converted);
            }

            inputValue.value = converted;
        }

        const hasPrependButton = computed(() => !!slots['prepend-button']);
        const hasAppendButton = computed(() => !!slots['append-button']);

        const hasPrependContent = computed(() => !!slots['prepend-content']);
        const hasAppendContent = computed(() => !!slots['append-content']);

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

            if (hasPrependButton.value) {
                emit('prepend');
            }

            if (hasAppendButton.value) {
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
            hasPrependButton,
            hasAppendButton,
            hasPrependContent,
            hasAppendContent,
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
            boxGlowByState,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsInput.scss" />
