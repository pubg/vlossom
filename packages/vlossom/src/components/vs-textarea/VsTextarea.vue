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

        <div :class="['vs-textarea', colorSchemeClass, classObj, stateClasses]" :style="computedStyleSet">
            <textarea
                ref="textareaRef"
                :id="computedId"
                :value="inputValue"
                :name="name"
                :disabled="computedDisabled"
                :readonly="computedReadonly"
                :aria-label="ariaLabel"
                :aria-required="required"
                :autocomplete="autocomplete ? 'on' : 'off'"
                :placeholder="placeholder"
                @input.stop="updateValue($event)"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
                @keyup.enter.stop="onEnter"
                @change.stop
            />
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
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import { useVsTextareaRules } from './vs-textarea-rules';

import type { InputValueType, VsTextareaStyleSet } from './types';

const name = VsComponent.VsTextarea;
export default defineComponent({
    name,
    components: { VsInputWrapper },
    props: {
        ...getInputProps<InputValueType, 'noClear'>('noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTextareaStyleSet> },
        autocomplete: { type: Boolean, default: false },
        max: {
            type: [Number, String],
            default: Number.MAX_SAFE_INTEGER,
            validator: (value: number | string) => utils.props.checkValidNumber(name, 'max', value),
        },
        min: {
            type: [Number, String],
            default: 0,
            validator: (value: number | string) => utils.props.checkValidNumber(name, 'min', value),
        },
        // v-model
        modelValue: { type: String, default: '' },
        modelModifiers: {
            type: Object as PropType<StringModifiers>,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur', 'enter'],
    // expose: ['clear', 'validate', 'focus', 'blur', 'select'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            dense,
            disabled,
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

        const { computedStyleSet } = useStyleSet<VsTextareaStyleSet>(name, styleSet);

        const { modifyStringValue } = useStringModifier(modelModifiers);

        const { requiredCheck, maxCheck, minCheck } = useVsTextareaRules(required, max, min);

        function convertValue(v: string): string {
            if (!v) {
                return '';
            }

            return modifyStringValue(v.toString());
        }

        function onClear() {
            inputValue.value = '';
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

        const textareaRef: Ref<HTMLInputElement | null> = ref(null);

        function focus() {
            textareaRef.value?.focus();
        }

        function blur() {
            textareaRef.value?.blur();
        }

        function select() {
            textareaRef.value?.select();
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

        return {
            computedId,
            classObj,
            colorSchemeClass,
            computedStyleSet,
            computedReadonly,
            computedDisabled,
            inputValue,
            updateValue,
            textareaRef,
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
            stateClasses,
        };
    },
});
</script>

<style lang="scss" src="./VsTextarea.scss" />
