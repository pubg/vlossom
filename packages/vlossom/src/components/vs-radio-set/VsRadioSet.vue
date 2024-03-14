<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
            :state="state"
            group-label
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div :class="['vs-radio-set', { column }]" :style="radioSetStyleSet">
                <vs-check-node
                    v-for="(option, index) in options"
                    :key="getOptionValue(option)"
                    class="vs-radio-item"
                    type="radio"
                    :id="`${id}-${optionIds[index]}`"
                    :color-scheme="computedColorScheme"
                    :style-set="radioStyleSet"
                    :checked="isChecked(option)"
                    :disabled="disabled"
                    :name="name"
                    :readonly="readonly"
                    :required="required"
                    :state="state"
                    :value="getOptionValue(option)"
                    :label="getOptionLabel(option)"
                    @toggle="onToggle(option)"
                    @focus="onFocus(option, $event)"
                    @blur="onBlur(option, $event)"
                >
                    <template #label v-if="$slots['radio-label']">
                        <slot
                            name="radio-label"
                            :option="option"
                            :value="getOptionValue(option)"
                            :label="getOptionLabel(option)"
                        />
                    </template>
                </vs-check-node>
            </div>

            <template #messages v-if="!noMsg">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import {
    useColorScheme,
    useStyleSet,
    getResponsiveProps,
    getInputProps,
    useInput,
    useInputOption,
    getInputOptionProps,
} from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsCheckNode } from '@/nodes';

import type { VsRadioSetStyleSet } from './types';
import type { VsRadioStyleSet } from './../vs-radio/types';

const name = VsComponent.VsRadioSet;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckNode },
    props: {
        ...getInputProps<any[], ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioSetStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(option: any) => Promise<boolean> | null>,
            default: null,
        },
        column: { type: Boolean, default: false },
        name: { type: String, required: true },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            beforeChange,
            disabled,
            label,
            modelValue,
            messages,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: radioStyleSet } = useStyleSet<VsRadioStyleSet>(VsComponent.VsRadio, styleSet);
        const { computedStyleSet: radioSetStyleSet } = useStyleSet<VsRadioSetStyleSet>(
            VsComponent.VsRadioSet,
            styleSet,
        );

        const classObj = computed(() => ({
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const inputValue = ref(modelValue.value);

        const { getOptionLabel, getOptionValue } = useInputOption(inputValue, options, optionLabel, optionValue);

        function requiredCheck() {
            const hasChecked = options.value.some((option) => isChecked(option));
            return required.value && !hasChecked ? 'required' : '';
        }

        function isChecked(option: any) {
            return utils.object.isEqual(inputValue.value, getOptionValue(option));
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

        async function onToggle(option: any) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(option);
                if (!result) {
                    return;
                }
            }

            inputValue.value = getOptionValue(option);
        }

        function onFocus(option: any, e: FocusEvent) {
            emit('focus', option, e);
        }

        function onBlur(option: any, e: FocusEvent) {
            emit('blur', option, e);
        }

        const optionIds = computed(() => options.value.map(() => utils.string.createID()));

        return {
            id,
            optionIds,
            classObj,
            computedColorScheme,
            radioStyleSet,
            radioSetStyleSet,
            isChecked,
            getOptionLabel,
            getOptionValue,
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

<style lang="scss" scoped src="./VsRadioSet.scss" />
