<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :label="label"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-msg="noMsg"
            :required="required"
            :shake="shake"
            group-label
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div :class="['vs-checkbox-set', { column }]" :style="checkboxSetStyleSet">
                <vs-check-node
                    v-for="(option, index) in options"
                    :key="getOptionValue(option)"
                    class="vs-checkbox-item"
                    type="checkbox"
                    :id="`${id}-${optionIds[index]}`"
                    :color-scheme="computedColorScheme"
                    :style-set="checkboxStyleSet"
                    :checked="isChecked(option)"
                    :disabled="disabled"
                    :readonly="readonly"
                    :required="required"
                    :name="name"
                    :value="getOptionValue(option)"
                    :label="getOptionLabel(option)"
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

import type { VsCheckboxSetStyleSet } from './types';
import { VsCheckboxStyleSet } from '../vs-checkbox/types';

const name = VsComponent.VsCheckboxSet;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckNode },
    props: {
        ...getInputProps<any[], ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxSetStyleSet>, default: '' },
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

        const { computedStyleSet: checkboxStyleSet } = useStyleSet<VsCheckboxStyleSet>(
            VsComponent.VsCheckbox,
            styleSet,
        );
        const { computedStyleSet: checkboxSetStyleSet } = useStyleSet<VsCheckboxSetStyleSet>(
            VsComponent.VsCheckboxSet,
            styleSet,
        );

        const classObj = computed(() => ({
            disabled: disabled.value,
            readonly: readonly.value,
        }));

        const inputValue = ref(modelValue.value);

        function onClear() {
            inputValue.value = [];
        }

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            options,
            optionLabel,
            optionValue,
            ref(true),
        );

        function requiredCheck() {
            return required.value && inputValue.value.length === 0 ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onClear,
            },
        });

        function isChecked(option: any) {
            return inputValue.value.some((v: any) => utils.object.isEqual(v, getOptionValue(option)));
        }

        async function onToggle(option: any, checked: boolean) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(isChecked(option), option);
                if (!result) {
                    return;
                }
            }

            const targetValue = getOptionValue(option);

            if (checked) {
                inputValue.value = [...inputValue.value, targetValue];
            } else {
                inputValue.value = inputValue.value.filter((v: any) => !utils.object.isEqual(v, targetValue));
            }
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
            checkboxStyleSet,
            checkboxSetStyleSet,
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

<style lang="scss" scoped src="./VsCheckboxSet.scss" />
