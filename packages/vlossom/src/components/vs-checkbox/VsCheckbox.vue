<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="checkLabel ? '' : id"
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
                :id="id"
                :color-scheme="computedColorScheme"
                :style-set="computedStyleSet"
                :checked="isChecked"
                :check-label="checkLabel"
                :disabled="disabled"
                :readonly="readonly"
                :required="required"
                :name="name"
                :value="trueValue"
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
        styleSet: { type: [String, Object] as PropType<string | VsCheckboxStyleSet>, default: '' },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        checkLabel: { type: String, default: '' },
        trueValue: { type: null, default: true },
        falseValue: { type: null, default: false },
        multiple: { type: Boolean, default: false },
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
            multiple,
            beforeChange,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsCheckboxStyleSet>(name, styleSet);

        const inputValue = ref(modelValue.value);

        const {
            isMatched: isChecked,
            initialValue,
            clearedValue,
            getChangedValue,
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
                    inputValue.value = initialValue.value;
                },
                onClear: () => {
                    inputValue.value = clearedValue.value;
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
            inputValue.value = getChangedValue(target.checked, inputValue.value);
        }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
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
