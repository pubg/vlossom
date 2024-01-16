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
            <div :class="['vs-checkbox-set', `vs-${computedColorScheme}`, { column }]" :style="customProperties">
                <div
                    v-for="option in options"
                    :key="`${id}-${getOptionValue(option)}`"
                    :class="['vs-checkbox', { ...classObj, checked: isChecked(option) }]"
                >
                    <div class="checkbox-container">
                        <span class="checkbox">
                            <check-icon class="check-icon" />
                        </span>
                        <input
                            type="checkbox"
                            :id="`${id}-${getOptionValue(option)}`"
                            :disabled="disabled || readonly"
                            :name="name || label"
                            :value="getOptionValue(option)"
                            :checked="isChecked(option)"
                            @change="toggle($event, option)"
                            @focus="onFocus(option)"
                            @blur="onBlur(option)"
                        />
                    </div>
                    <label :for="`${id}-${getOptionValue(option)}`">{{ getOptionLabel(option) }}</label>
                </div>
            </div>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, watch } from 'vue';
import { useColorScheme, useCustomStyle, getResponsiveProps, getInputProps, useInput } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { CheckIcon } from '@/icons';

import type { VsCheckboxStyleSet } from '../vs-checkbox/types';

const name = VsComponent.VsCheckboxSet;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, CheckIcon },
    props: {
        ...getInputProps<any[]>(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(value: any, target: any) => Promise<boolean> | null>,
            default: null,
        },
        column: { type: Boolean, default: false },
        name: { type: String, default: '' },
        options: { type: Array as PropType<any[]>, required: true },
        optionLabel: { type: String, default: '' },
        optionValue: { type: String, default: '' },
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

        const id = utils.string.createID();

        const inputValue = ref(modelValue.value);

        function isChecked(option: any) {
            return inputValue.value.some((v: any) => utils.object.isEqual(v, getOptionValue(option)));
        }

        function getOptionLabel(option: any) {
            if (typeof option === 'object') {
                if (optionLabel.value) {
                    return option[optionLabel.value];
                } else {
                    return JSON.stringify(option);
                }
            }

            return option + '';
        }

        function getOptionValue(option: any) {
            if (typeof option === 'object' && optionValue.value) {
                return option[optionValue.value];
            }

            return option;
        }

        function requiredCheck() {
            return required.value && inputValue.value.length === 0 ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onClear: () => {
                    inputValue.value = [];
                },
            },
        });

        async function toggle(e: Event, option: any) {
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

        watch(options, (newOptions, oldOptions) => {
            if (utils.object.isEqual(newOptions, oldOptions)) {
                return;
            }

            inputValue.value = [];
        });

        return {
            classObj,
            computedColorScheme,
            customProperties,
            id,
            isChecked,
            getOptionLabel,
            getOptionValue,
            inputValue,
            computedMessages,
            shake,
            validate,
            clear,
            toggle,
            onFocus,
            onBlur,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsCheckboxSet.scss" />
