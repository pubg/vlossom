<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
            :label="label"
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

            <div
                role="switch"
                :class="[
                    'vs-switch',
                    `vs-${computedColorScheme}`,
                    boxGlowByState,
                    { checked: isChecked, disabled, readonly },
                ]"
                :style="computedStyleSet"
                :aria-checked="isChecked"
                :aria-disabled="disabled"
                :aria-labelledby="id ? id : undefined"
                :aria-readonly="readonly"
                :aria-required="required"
                tabindex="0"
                :disabled="disabled"
                @click.stop="toggle()"
                @keydown.space.prevent="toggle()"
                @keydown.enter.prevent="toggle()"
                @focus="onFocus"
                @blur="onBlur"
            >
                <span class="status-label" data-value="true" v-show="isChecked">
                    {{ trueLabel }}
                </span>
                <span class="status-label" data-value="false" v-show="!isChecked">
                    {{ falseLabel }}
                </span>
            </div>

            <input
                type="checkbox"
                style="display: none"
                aria-hidden
                :id="id"
                :name="name"
                tabindex="-1"
                :disabled="disabled || readonly"
                :checked="isChecked"
                @change="toggle()"
            />

            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed, ref } from 'vue';
import {
    useColorScheme,
    useStyleSet,
    getInputProps,
    getResponsiveProps,
    useInput,
    useValueMatcher,
    useStateClass,
} from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration';

import type { VsSwitchStyleSet } from './types';

const name = VsComponent.VsSwitch;
export default defineComponent({
    name,
    props: {
        ...getInputProps<any, ['noClear', 'placeholder']>('noClear', 'placeholder'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSwitchStyleSet> },
        beforeChange: {
            type: Function as PropType<(value: any) => Promise<boolean> | null>,
            default: null,
        },
        trueValue: { type: null, default: true },
        falseValue: { type: null, default: false },
        trueLabel: { type: String, default: 'ON' },
        falseLabel: { type: String, default: 'OFF' },
        multiple: { type: Boolean, default: false },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'change', 'update:valid', 'focus', 'blur'],
    expose: ['clear', 'validate'],

    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            disabled,
            label,
            messages,
            readonly,
            required,
            rules,
            beforeChange,
            trueValue,
            falseValue,
            multiple,
            modelValue,
            state,
        } = toRefs(props);

        const { emit } = context;

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet(name, styleSet);

        const { boxGlowByState } = useStateClass(state);

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
                    inputValue.value = getInitialValue();
                },
                onClear: () => {
                    inputValue.value = getClearedValue();
                },
            },
        });

        async function toggle() {
            if (disabled.value || readonly.value) {
                return;
            }

            const beforeChangeFn = beforeChange.value;
            if (beforeChangeFn) {
                const result = await beforeChangeFn(inputValue.value);
                if (!result) {
                    return;
                }
            }

            inputValue.value = getUpdatedValue(!isChecked.value, inputValue.value);
        }

        function onFocus(e: FocusEvent) {
            emit('focus', e);
        }

        function onBlur(e: FocusEvent) {
            emit('blur', e);
        }

        return {
            computedColorScheme,
            computedStyleSet,
            isChecked,
            toggle,
            onFocus,
            onBlur,
            computedMessages,
            shake,
            validate,
            clear,
            id,
            boxGlowByState,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsSwitch.scss" />
