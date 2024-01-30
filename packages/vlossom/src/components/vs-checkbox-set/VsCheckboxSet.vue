<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div :class="['vs-checkbox-set', { column }]">
                <vs-checkbox-node
                    v-for="option in options"
                    :key="getOptionValue(option)"
                    :colorScheme="computedColorScheme"
                    :customProperties="customProperties"
                    :checked="isChecked(option)"
                    :disabled="disabled"
                    :readonly="readonly"
                    :name="name"
                    :value="convertValue(getOptionValue(option))"
                    :check-label="getOptionLabel(option)"
                    @toggle="onToggle($event, option)"
                    @focus="onFocus(option)"
                    @blur="onBlur(option)"
                />
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
    useCustomStyle,
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
import VsCheckboxNode from '@/nodes/vs-checkbox-node/VsCheckboxNode.vue';

import type { VsCheckboxStyleSet } from '../vs-checkbox/types';

const name = VsComponent.VsCheckboxSet;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckboxNode },
    props: {
        ...getInputProps<any[], ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(checked: boolean, target: any) => Promise<boolean> | null>,
            default: null,
        },
        column: { type: Boolean, default: false },
        // v-model
        modelValue: { type: Array as PropType<any[]>, default: () => [] },
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

        const { customProperties } = useCustomStyle<VsCheckboxStyleSet>(VsComponent.VsCheckbox, styleSet);

        const classObj = computed(() => ({
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const inputValue = ref(modelValue.value);

        function onClear() {
            inputValue.value = [];
        }

        const { getOptionLabel, getOptionValue } = useInputOption(options, optionLabel, optionValue, { onClear });

        function requiredCheck() {
            return required.value && inputValue.value.length === 0 ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onClear,
            },
        });

        function isChecked(option: any) {
            return inputValue.value.some((v: any) => utils.object.isEqual(v, getOptionValue(option)));
        }

        async function onToggle(e: Event, option: any) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(isChecked(option), option);
                if (!result) {
                    return;
                }
            }

            const target = e.target as HTMLInputElement;
            const targetValue = getOptionValue(option);

            if (target.checked) {
                inputValue.value = [...inputValue.value, targetValue];
            } else {
                inputValue.value = inputValue.value.filter((v: any) => !utils.object.isEqual(v, targetValue));
            }
        }

        function onFocus(option: any) {
            emit('focus', option);
        }

        function onBlur(option: any) {
            emit('blur', option);
        }

        function convertValue(value: any) {
            if (typeof value === 'string') {
                return value;
            }

            return JSON.stringify(value);
        }

        return {
            classObj,
            computedColorScheme,
            customProperties,
            isChecked,
            getOptionLabel,
            getOptionValue,
            convertValue,
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

<style lang="scss" scoped src="./VsCheckboxSet.scss" />
