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

            <vs-check-node
                type="radio"
                :id="id"
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :checked="isChecked"
                :label="radioLabel"
                :disabled="disabled"
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
            </vs-check-node>

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
import { VsCheckNode } from '@/nodes';

import type { VsRadioStyleSet } from './types';

const name = VsComponent.VsRadio;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckNode },
    props: {
        ...getInputProps<any, ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioStyleSet> },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        name: { type: String, required: true },
        radioValue: { type: null, required: true },
        radioLabel: { type: String, default: '' },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const { beforeChange, colorScheme, styleSet, label, modelValue, messages, required, rules, radioValue } =
            toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsRadioStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const isChecked = computed(() => {
            return utils.object.isEqual(inputValue.value, radioValue.value);
        });

        function requiredCheck() {
            return required.value && !isChecked.value ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onClear: () => {
                    inputValue.value = null;
                },
            },
        });

        async function onToggle(checked: boolean) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            inputValue.value = checked ? radioValue.value : null;
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
        };
    },
});
</script>
