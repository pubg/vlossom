<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="checkLabel ? '' : id"
            :label="label"
            :disabled="disabled"
            :messages="computedMessages"
            :no-label="noLabel"
            :no-message="noMessage"
            :required="required"
            :shake="shake"
            :state="state"
        >
            <template #label v-if="!noLabel">
                <slot name="label" />
            </template>

            <vs-checkbox-node
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :checked="isChecked"
                :disabled="disabled"
                :id="id"
                :indeterminate="indeterminate"
                :label="checkLabel"
                :name="name"
                :readonly="readonly"
                :required="required"
                :state="state"
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
    useValueMatcher,
} from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsInputWrapper from '@/components/vs-input-wrapper/VsInputWrapper.vue';
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';
import { VsCheckboxNode } from '@/nodes';

import type { VsCheckboxStyleSet } from './types';

const name = VsComponent.VsCheckbox;
export default defineComponent({
    name,
    components: { VsInputWrapper, VsWrapper, VsCheckboxNode },
    props: {
        ...getInputProps<any, ['placeholder', 'noClear']>('placeholder', 'noClear'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet> },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
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
    expose: ['clear', 'validate'],
    setup(props, context) {
        const {
            beforeChange,
            checked,
            colorScheme,
            label,
            modelValue,
            messages,
            required,
            rules,
            trueValue,
            falseValue,
            multiple,
            styleSet,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsCheckboxStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const {
            isMatched: isChecked,
            getInitialValue,
            getClearedValue,
            getUpdatedValue,
        } = useValueMatcher(multiple, modelValue, inputValue, trueValue, falseValue);

        function requiredCheck() {
            return required.value && !isChecked.value ? 'required' : '';
        }

        const allRules = computed(() => [...rules.value, requiredCheck]);

        const { computedMessages, shake, validate, clear, id } = useInput(inputValue, modelValue, context, label, {
            messages,
            rules: allRules,
            callbacks: {
                onMounted: () => {
                    if (checked.value) {
                        inputValue.value = getUpdatedValue(true, inputValue.value);
                    } else {
                        inputValue.value = getInitialValue();
                    }
                },
                onClear: () => {
                    inputValue.value = getClearedValue();
                },
            },
        });

        async function onToggle(c: boolean) {
            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            inputValue.value = getUpdatedValue(c, inputValue.value);
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        return {
            id,
            isChecked,
            computedColorScheme,
            computedStyleSet,
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
