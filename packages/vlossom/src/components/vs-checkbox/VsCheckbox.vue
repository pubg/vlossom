<template>
    <vs-responsive :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="checkLabel ? '' : computedId"
            :label="label"
            :dense="dense"
            :disabled="computedDisabled"
            :messages="computedMessages"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
        >
            <template #label v-if="label || $slots['label']">
                <slot name="label" />
            </template>

            <vs-checkbox-node
                ref="checkboxRef"
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :aria-label="ariaLabel"
                :checked="isChecked"
                :dense="dense"
                :disabled="computedDisabled"
                :id="computedId"
                :indeterminate="indeterminate"
                :label="checkLabel"
                :name="name"
                :readonly="computedReadonly"
                :required="required"
                :state="computedState"
                :value="trueValue"
                @toggle="onToggle"
                @focus="onFocus"
                @blur="onBlur"
            >
                <template #label v-if="$slots['check-label']">
                    <slot name="check-label" />
                </template>
            </vs-checkbox-node>

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-responsive>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import {
    useColorScheme,
    useStyleSet,
    getResponsiveProps,
    getInputProps,
    useInput,
    useValueMatcher,
} from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import { VsCheckboxNode } from '@/nodes';

import type { VsCheckboxStyleSet } from './types';

const name = VsComponent.VsCheckbox;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsResponsive, VsCheckboxNode },
    props: {
        ...getInputProps<any, ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet> },
        beforeChange: {
            type: Function as PropType<(from: any, to: any) => Promise<boolean> | null>,
            default: null,
        },
        checked: { type: Boolean, default: false },
        checkLabel: { type: String, default: '' },
        indeterminate: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false },
        trueValue: { type: null, default: true },
        falseValue: { type: null, default: false },
        // v-model
        modelValue: { type: null, default: false },
    },
    emits: ['update:modelValue', 'update:changed', 'update:valid', 'change', 'focus', 'blur'],
    expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            beforeChange,
            checked,
            colorScheme,
            id,
            disabled,
            readonly,
            modelValue,
            messages,
            required,
            rules,
            state,
            trueValue,
            falseValue,
            multiple,
            styleSet,
            noDefaultRules,
        } = toRefs(props);
        const checkboxRef: Ref<HTMLInputElement | null> = ref(null);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsCheckboxStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const {
            isMatched: isChecked,
            getInitialValue,
            getClearedValue,
            getUpdatedValue,
        } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

        function requiredCheck() {
            return required.value && !isChecked.value ? 'required' : '';
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
                onMounted: () => {
                    if (checked.value) {
                        inputValue.value = getUpdatedValue(true);
                    } else {
                        inputValue.value = getInitialValue();
                    }
                },
                onChange: () => {
                    if (inputValue.value === undefined || inputValue.value === null) {
                        inputValue.value = getClearedValue();
                    }
                },
                onClear: () => {
                    inputValue.value = getClearedValue();
                },
            },
        });

        async function onToggle(c: boolean) {
            const toValue = getUpdatedValue(c);

            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value, toValue);
                if (!result) {
                    return;
                }
            }

            inputValue.value = toValue;
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        function focus() {
            checkboxRef.value?.focus();
        }

        function blur() {
            checkboxRef.value?.blur();
        }

        return {
            computedId,
            checkboxRef,
            isChecked,
            computedColorScheme,
            computedState,
            computedDisabled,
            computedReadonly,
            computedStyleSet,
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
