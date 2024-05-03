<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :label="label"
            :disabled="disabled"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
            :state="state"
            group-label
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div :class="['vs-radio-set', { vertical }]" :style="radioSetStyleSet">
                <vs-radio-node
                    v-for="(option, index) in options"
                    :key="getOptionValue(option)"
                    class="vs-radio-item"
                    :color-scheme="computedColorScheme"
                    :style-set="radioStyleSet"
                    :checked="isChecked(option)"
                    :disabled="disabled"
                    :id="`${id}-${optionIds[index]}`"
                    :label="getOptionLabel(option)"
                    :name="name"
                    :readonly="readonly"
                    :required="required"
                    :state="state"
                    :value="getOptionValue(option)"
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
                </vs-radio-node>
            </div>

            <template #messages v-if="!noMessage">
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
import { VsRadioNode } from '@/nodes';

import type { VsRadioSetStyleSet } from './types';
import type { VsRadioStyleSet } from '@/components/vs-radio/types';

export default defineComponent({
    name: VsComponent.VsRadioSet,
    components: { VsInputWrapper, VsWrapper, VsRadioNode },
    props: {
        ...getInputProps<any[], ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioSetStyleSet> },
        beforeChange: {
            type: Function as PropType<(from: any, to: any, option: any) => Promise<boolean> | null>,
            default: null,
        },
        name: { type: String, required: true },
        vertical: { type: Boolean, default: false },
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
            name,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(VsComponent.VsRadioSet, colorScheme);

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
            if (!required.value) {
                return '';
            }

            const checkedRadioElement = document.querySelector(`input[name="${name.value}"]:checked`);
            return !checkedRadioElement ? 'required' : '';
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
            // radio change event value is always true
            const beforeChangeFn = beforeChange.value;
            const toValue = getOptionValue(option);
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value, toValue, option);
                if (!result) {
                    return;
                }
            }

            inputValue.value = toValue;
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
