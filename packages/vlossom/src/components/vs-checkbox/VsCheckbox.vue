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

            <vs-checkbox-node
                :colorScheme="computedColorScheme"
                :customProperties="customProperties"
                :checked="isChecked"
                :check-label="checkLabel || label"
                :disabled="disabled"
                :readonly="readonly"
                :name="name"
                :value="value"
                @toggle="onToggle"
                @focus="onFocus"
                @blur="onBlur"
            />

            <template #messages v-if="!noMsg">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
import { useColorScheme, useCustomStyle, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import VsCheckboxNode from './VsCheckboxNode.vue';

import type { VsCheckboxStyleSet } from './types';

const name = VsComponent.VsCheckbox;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckboxNode },
    props: {
        ...getInputProps<any>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        checkLabel: { type: String, default: '' },
        trueValue: { type: null, default: true },
        falseValue: { type: null, default: false },
        value: { type: String, default: '' },
        // v-model
        modelValue: { type: null, default: false },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            label,
            modelValue,
            messages,
            required,
            rules,
            trueValue,
            falseValue,
            beforeChange,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsCheckboxStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const isArrayValue = computed(() => Array.isArray(modelValue.value));

        const isChecked = computed(() => {
            if (isArrayValue.value) {
                return inputValue.value.some((v: any) => utils.object.isEqual(v, trueValue.value));
            }

            return utils.object.isEqual(inputValue.value, trueValue.value);
        });

        function requiredCheck() {
            return required.value && !isChecked.value ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    if (isArrayValue.value) {
                        return;
                    }

                    inputValue.value = modelValue.value === trueValue.value ? trueValue.value : falseValue.value;
                },
                onClear: () => {
                    inputValue.value = isArrayValue.value
                        ? inputValue.value.filter((v: any) => !utils.object.isEqual(v, trueValue.value))
                        : falseValue.value;
                },
            },
        });

        async function onToggle(e: Event) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            const target = e.target as HTMLInputElement;

            if (isArrayValue.value) {
                if (target.checked) {
                    inputValue.value = [...inputValue.value, trueValue.value];
                } else {
                    inputValue.value = inputValue.value.filter((v: any) => !utils.object.isEqual(v, trueValue.value));
                }
            } else {
                inputValue.value = target.checked ? trueValue.value : falseValue.value;
            }
        }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
        }

        return {
            isChecked,
            computedColorScheme,
            customProperties,
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
