<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :label="label"
        :required="required"
        :disabled="computedDisabled"
        :dense="dense"
        :messages="computedMessages"
        :no-message="noMessage"
        :shake="shake"
        group-label
    >
        <template #label v-if="label || $slots['label']">
            <slot name="label" />
        </template>

        <div :class="['vs-radio-set', { 'vs-vertical': vertical }]" :style="computedStyleSet">
            <vs-radio-node
                v-for="(option, index) in options"
                :key="getOptionValue(option)"
                ref="radioRefs"
                class="vs-radio-item"
                :color-scheme="computedColorScheme"
                :style-set="radioNodeStyleSet"
                :checked="isChecked(option)"
                :dense="dense"
                :disabled="computedDisabled"
                :id="`${computedId}-${index}`"
                :label="getOptionLabel(option)"
                :name="name"
                :readonly="computedReadonly"
                :required="required"
                :state="computedState"
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet, useInput, useInputOption } from '@/composables';
import { getInputProps, getInputOptionProps, getResponsiveProps } from '@/models';
import { VsComponent, VsNode, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsRadioNode from '@/components/vs-radio/VsRadioNode.vue';

import type { VsRadioNodeStyleSet, VsRadioSetStyleSet } from './types';

export default defineComponent({
    name: VsComponent.VsRadioSet,
    components: { VsInputWrapper, VsRadioNode },
    props: {
        ...getInputProps<any[], 'ariaLabel' | 'noClear' | 'placeholder'>('ariaLabel', 'noClear', 'placeholder'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsRadioSetStyleSet> },
        name: { type: String, required: true },
        vertical: { type: Boolean, default: false },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    // expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            disabled,
            id,
            modelValue,
            messages,
            name,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
            state,
            noDefaultRules,
        } = toRefs(props);

        const radioRefs: Ref<HTMLInputElement[]> = ref([]);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(VsComponent.VsRadioSet, colorScheme);

        const { plainStyleSet: radioSetStyleSet, computedStyleSet } = useStyleSet<VsRadioSetStyleSet>(
            VsComponent.VsRadioSet,
            styleSet,
        );
        const { plainStyleSet: radioNodeStyleSet } = useStyleSet<VsRadioNodeStyleSet>(
            VsNode.VsRadioNode,
            styleSet,
            radioSetStyleSet,
        );

        const inputValue = ref(modelValue.value);

        const { getOptionLabel, getOptionValue } = useInputOption(inputValue, options, optionLabel, optionValue);

        function requiredCheck() {
            if (!required.value) {
                return '';
            }

            const radioElements = document.querySelectorAll(`input[name="${name.value}"]`);
            const checkedRadioElement = Array.from(radioElements).find((el) => (el as HTMLInputElement).checked);
            return !checkedRadioElement ? 'required' : '';
        }

        function isChecked(option: any) {
            return utils.object.isEqual(inputValue.value, getOptionValue(option));
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
                onClear: () => {
                    inputValue.value = null;
                },
            },
        });

        const classObj = computed(() => ({
            disabled: computedDisabled.value,
            readonly: computedReadonly.value,
        }));

        async function onToggle(option: any) {
            // radio change event value is always true
            inputValue.value = getOptionValue(option);
        }

        function onFocus(option: any, e: FocusEvent) {
            emit('focus', option, e);
        }

        function onBlur(option: any, e: FocusEvent) {
            emit('blur', option, e);
        }

        function focus() {
            radioRefs.value[0]?.focus();
        }

        function blur() {
            radioRefs.value[0]?.blur();
        }

        return {
            computedId,
            radioRefs,
            classObj,
            computedColorScheme,
            computedState,
            computedDisabled,
            computedReadonly,
            radioNodeStyleSet,
            computedStyleSet,
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
            focus,
            blur,
        };
    },
});
</script>

<style lang="scss" src="./VsRadioSet.scss" />
