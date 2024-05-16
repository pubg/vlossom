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

            <textarea
                ref="textareaRef"
                :class="['vs-textarea', `vs-${computedColorScheme}`, { ...classObj }, boxGlowByState]"
                :style="computedStyleSet"
                :id="id"
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
import { useVsTextareaRules } from './vs-textarea-rules';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';

import type { InputValueType, VsTextareaStyleSet } from './types';

const name = VsComponent.VsTextarea;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper },
    props: {
        ...getInputProps<InputValueType, ['noClear']>('noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTextareaStyleSet> },
        max: { type: [Number, String], default: Number.MAX_SAFE_INTEGER },
        min: { type: [Number, String], default: Number.MIN_SAFE_INTEGER },
        // v-model
        modelValue: { type: String, default: '' },
        modelModifiers: {
            type: Object as PropType<StringModifiers>,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur', 'enter'],
    expose: ['clear', 'validate', 'focus', 'blur', 'select'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            disabled,
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

        const { emit } = context;

        const inputValue: Ref<InputValueType> = ref(modelValue.value);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTextareaStyleSet>(name, styleSet);

        const { boxGlowByState } = useStateClass(state);

        const { modifyStringValue } = useStringModifier(modelModifiers);

        const { requiredCheck, maxCheck, minCheck } = useVsTextareaRules(required, max, min);

        const classObj = computed(() => ({
            disabled: disabled.value,
        }));

        const allRules = computed(() => [...rules.value, requiredCheck, maxCheck, minCheck]);

        function onClear() {
            inputValue.value = '';
        }

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    inputValue.value = modelValue.value || '';
                },
                onClear,
            },
        });

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = target.value || '';
            inputValue.value = modifyStringValue(targetValue);
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
            id,
            classObj,
            computedColorScheme,
            computedStyleSet,
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
            boxGlowByState,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTextarea.scss" />
