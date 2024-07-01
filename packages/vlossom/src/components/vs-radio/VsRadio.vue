<template>
    <vs-responsive :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="radioLabel ? '' : computedId"
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

            <vs-radio-node
                ref="radioRef"
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :aria-label="ariaLabel"
                :checked="isChecked"
                :disabled="computedDisabled"
                :id="computedId"
                :label="radioLabel"
                :name="name"
                :readonly="computedReadonly"
                :required="required"
                :state="computedState"
                :value="radioValue"
                @toggle="onToggle"
                @focus="onFocus"
                @blur="onBlur"
            >
                <template #label v-if="$slots['radio-label']">
                    <slot name="radio-label" />
                </template>
            </vs-radio-node>

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-responsive>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import { VsRadioNode } from '@/nodes';

import type { VsRadioStyleSet } from './types';

export default defineComponent({
    name: VsComponent.VsRadio,
    components: { VsInputWrapper, VsResponsive, VsRadioNode },
    props: {
        ...getInputProps<any, ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioStyleSet> },
        checked: { type: Boolean, default: false },
        name: { type: String, required: true },
        radioLabel: { type: String, default: '' },
        radioValue: { type: null, required: true },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            checked,
            colorScheme,
            id,
            disabled,
            readonly,
            messages,
            modelValue,
            name,
            radioValue,
            required,
            rules,
            state,
            styleSet,
            noDefaultRules,
        } = toRefs(props);

        const radioRef: Ref<HTMLInputElement | null> = ref(null);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(VsComponent.VsRadio, colorScheme);

        const { computedStyleSet } = useStyleSet<VsRadioStyleSet>(VsComponent.VsRadio, styleSet);

        const inputValue = ref(checked.value ? radioValue.value : modelValue.value);

        const isChecked = computed(() => {
            return utils.object.isEqual(inputValue.value, radioValue.value);
        });

        function requiredCheck() {
            if (!required.value) {
                return '';
            }

            const radioElements = document.querySelectorAll(`input[name="${name.value}"]`);
            const checkedRadioElement = Array.from(radioElements).find((el) => (el as HTMLInputElement).checked);
            return !checkedRadioElement ? 'required' : '';
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
            defaultRules: [requiredCheck],
            noDefaultRules,
            state,
            callbacks: {
                onMounted: () => {
                    if (checked.value) {
                        inputValue.value = radioValue.value;
                    }
                },
                onClear: () => {
                    inputValue.value = null;
                },
            },
        });

        async function onToggle() {
            // radio change event value is always true
            inputValue.value = radioValue.value;
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        function focus() {
            radioRef.value?.focus();
        }

        function blur() {
            radioRef.value?.blur();
        }

        return {
            computedId,
            radioRef,
            isChecked,
            computedColorScheme,
            computedState,
            computedStyleSet,
            computedDisabled,
            computedReadonly,
            inputValue,
            computedMessages,
            shake,
            validate,
            clear,
            onToggle,
            onFocus,
            onBlur,
            focus,
            blur,
        };
    },
});
</script>
