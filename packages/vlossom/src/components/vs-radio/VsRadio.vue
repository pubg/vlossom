<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="radioLabel ? '' : id"
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

            <vs-radio-node
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :aria-label="ariaLabel || radioLabel || label || convertToString(radioValue)"
                :checked="isChecked"
                :disabled="disabled"
                :id="id"
                :label="radioLabel"
                :name="name"
                :readonly="readonly"
                :required="required"
                :state="state"
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
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsRadioNode } from '@/nodes';

import type { VsRadioStyleSet } from './types';

export default defineComponent({
    name: VsComponent.VsRadio,
    components: { VsInputWrapper, VsWrapper, VsRadioNode },
    props: {
        ...getInputProps<any, ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioStyleSet> },
        ariaLabel: { type: String, default: '' },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        checked: { type: Boolean, default: false },
        name: { type: String, required: true },
        radioLabel: { type: String, default: '' },
        radioValue: { type: null, required: true },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            beforeChange,
            checked,
            colorScheme,
            label,
            messages,
            modelValue,
            name,
            radioValue,
            required,
            rules,
            styleSet,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(VsComponent.VsRadio, colorScheme);

        const { computedStyleSet } = useStyleSet<VsRadioStyleSet>(VsComponent.VsRadio, styleSet);

        const inputValue = ref(modelValue.value);

        const isChecked = computed(() => {
            return utils.object.isEqual(inputValue.value, radioValue.value);
        });

        function requiredCheck() {
            if (!required.value) {
                return '';
            }

            const checkedRadioElement = document.querySelector(`input[name="${name.value}"]:checked`);
            return !checkedRadioElement ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
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
            // radio changed value is always true
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            inputValue.value = radioValue.value;
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        return {
            id,
            isChecked,
            computedColorScheme,
            computedStyleSet,
            inputValue,
            computedMessages,
            shake,
            validate,
            clear,
            onToggle,
            onFocus,
            onBlur,
            convertToString: utils.string.convertToString,
        };
    },
});
</script>
