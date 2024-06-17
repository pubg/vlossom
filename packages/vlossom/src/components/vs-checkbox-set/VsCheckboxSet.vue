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
            group-label
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <div :class="['vs-checkbox-set', { vertical }]" :style="checkboxSetStyleSet">
                <vs-checkbox-node
                    v-for="(option, index) in options"
                    :key="getOptionValue(option)"
                    ref="checkboxRefs"
                    class="vs-checkbox-item"
                    :color-scheme="computedColorScheme"
                    :style-set="checkboxStyleSet"
                    :checked="isChecked(option)"
                    :disabled="disabled"
                    :id="`${id}-${optionIds[index]}`"
                    :label="getOptionLabel(option)"
                    :name="name"
                    :readonly="readonly"
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
    </vs-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
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
import { VsCheckboxNode } from '@/nodes';
import { useVsCheckboxSetRules } from './vs-checkbox-set-rules';

import type { VsCheckboxSetStyleSet } from './types';
import type { VsCheckboxStyleSet } from '@/components/vs-checkbox/types';

const name = VsComponent.VsCheckboxSet;

export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckboxNode },
    props: {
        ...getInputProps<any[], ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getInputOptionProps(),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxSetStyleSet> },
        beforeChange: {
            type: Function as PropType<(from: any, to: any, option: any) => Promise<boolean> | null>,
            default: null,
        },
        max: { type: [Number, String], default: Number.MAX_SAFE_INTEGER },
        min: { type: [Number, String], default: 0 },
        vertical: { type: Boolean, default: false },
        // v-model
        modelValue: {
            type: Array as PropType<any[]>,
            default: () => [],
        },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate', 'focus', 'blur'],
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
            state,
            max,
            min,
        } = toRefs(props);

        const checkboxRefs: Ref<HTMLInputElement[]> = ref([]);

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

        const { getOptionLabel, getOptionValue } = useInputOption(
            inputValue,
            options,
            optionLabel,
            optionValue,
            ref(true),
        );

        const { requiredCheck, maxCheck, minCheck } = useVsCheckboxSetRules(required, max, min);

        const allRules = computed(() => [...rules.value, requiredCheck, maxCheck, minCheck]);

        const { computedMessages, computedState, shake, validate, clear, id } = useInput(
            inputValue,
            modelValue,
            context,
            label,
            {
                messages,
                rules: allRules,
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
            },
        );

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

        const optionIds = computed(() => options.value.map(() => utils.string.createID()));

        return {
            id,
            checkboxRefs,
            optionIds,
            classObj,
            computedColorScheme,
            computedState,
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
            focus,
            blur,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsCheckboxSet.scss" />
