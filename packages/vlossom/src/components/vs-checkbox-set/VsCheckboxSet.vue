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

        <div :class="['vs-checkbox-set', { 'vs-vertical': vertical }]" :style="computedStyleSet">
            <vs-checkbox-node
                v-for="(option, index) in options"
                :key="getOptionValue(option)"
                ref="checkboxRefs"
                class="vs-checkbox-item"
                :color-scheme="computedColorScheme"
                :style-set="checkboxNodeStyleSet"
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
                @toggle="onToggle(option, $event)"
                @focus="onFocus(option, $event)"
                @blur="onBlur(option, $event)"
            >
                <template #label v-if="$slots['check-label']">
                    <slot
                        name="check-label"
                        :option="option"
                        :value="getOptionValue(option)"
                        :label="getOptionLabel(option)"
                    />
                </template>
            </vs-checkbox-node>
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
import { VsCheckboxNode, VsCheckboxNodeStyleSet } from '@/nodes';
import { useVsCheckboxSetRules } from './vs-checkbox-set-rules';

import type { VsCheckboxSetStyleSet } from './types';

const name = VsComponent.VsCheckboxSet;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsCheckboxNode },
    props: {
        ...getInputProps<any[], 'ariaLabel' | 'noClear' | 'placeholder'>('ariaLabel', 'noClear', 'placeholder'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxSetStyleSet> },
        beforeChange: {
            type: Function as PropType<(from: any, to: any, option: any) => Promise<boolean> | null>,
            default: null,
        },
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
        vertical: { type: Boolean, default: false },
        // v-model
        modelValue: {
            type: Array as PropType<any[]>,
            default: () => [],
        },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    // expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            beforeChange,
            disabled,
            id,
            modelValue,
            messages,
            options,
            optionLabel,
            optionValue,
            readonly,
            required,
            rules,
            state,
            max,
            min,
            noDefaultRules,
        } = toRefs(props);

        const checkboxRefs: Ref<HTMLInputElement[]> = ref([]);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { plainStyleSet: checkboxSetStyleSet, computedStyleSet } = useStyleSet<VsCheckboxSetStyleSet>(
            name,
            styleSet,
        );
        const { plainStyleSet: checkboxNodeStyleSet } = useStyleSet<VsCheckboxNodeStyleSet>(
            VsNode.VsCheckboxNode,
            styleSet,
            checkboxSetStyleSet,
        );

        const inputValue = ref(modelValue.value);

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            options,
            optionLabel,
            optionValue,
            ref(true),
        );

        const { requiredCheck, maxCheck, minCheck } = useVsCheckboxSetRules(required, max, min);

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
                    if (!inputValue.value) {
                        inputValue.value = [];
                    }
                },
                onChange: () => {
                    if (!inputValue.value) {
                        inputValue.value = [];
                    }
                },
                onClear: () => {
                    inputValue.value = [];
                },
            },
        });

        const classObj = computed(() => ({
            disabled: computedDisabled.value,
            readonly: computedReadonly.value,
        }));

        function isChecked(option: any) {
            if (!inputValue.value) {
                return false;
            }
            return inputValue.value.some((v: any) => utils.object.isEqual(v, getOptionValue(option)));
        }

        async function onToggle(option: any, checked: boolean) {
            const targetOptionValue = getOptionValue(option);
            const toValue = checked
                ? [...inputValue.value, targetOptionValue]
                : inputValue.value.filter((v: any) => !utils.object.isEqual(v, targetOptionValue));

            const beforeChangeFn = beforeChange.value;
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

        function focus() {
            checkboxRefs.value[0]?.focus();
        }

        function blur() {
            checkboxRefs.value[0]?.blur();
        }

        return {
            computedId,
            checkboxRefs,
            classObj,
            computedColorScheme,
            computedState,
            computedDisabled,
            computedReadonly,
            checkboxNodeStyleSet,
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

<style lang="scss" src="./VsCheckboxSet.scss" />
