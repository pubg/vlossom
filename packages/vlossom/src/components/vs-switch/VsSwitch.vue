<template>
    <vs-input-wrapper
        v-show="visible"
        :width="width"
        :grid="grid"
        :id="computedId"
        :label="label"
        :required="required"
        :disabled="computedDisabled"
        :dense="dense"
        :messages="computedMessages"
        :no-message="noMessage"
        :shake="shake"
    >
        <template #label v-if="label || $slots['label']">
            <slot name="label" />
        </template>

        <div
            :class="[
                'vs-switch',
                colorSchemeClass,
                { 'vs-checked': isChecked, 'vs-disabled': computedDisabled, 'vs-readonly': computedReadonly, dense },
            ]"
            :style="computedStyleSet"
        >
            <input
                type="checkbox"
                ref="switchRef"
                class="vs-switch-input"
                :id="computedId"
                :name="name"
                :disabled="computedDisabled || computedReadonly"
                :checked="isChecked"
                :value="convertToString(trueValue)"
                :aria-label="ariaLabel"
                :aria-required="required"
                @focus.stop="onFocus"
                @blur.stop="onBlur"
            />

            <div :class="['vs-switch-button', stateClasses]" @click.prevent.stop="onClick">
                <span class="vs-status-label" data-value="true" v-show="isChecked">
                    {{ trueLabel }}
                </span>
                <span class="vs-status-label" data-value="false" v-show="!isChecked">
                    {{ falseLabel }}
                </span>
            </div>
        </div>
        <template #messages v-if="!noMessage">
            <slot name="messages" />
        </template>
    </vs-input-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, ref, Ref } from 'vue';
import { useColorScheme, useStyleSet, useInput, useValueMatcher, useStateClass } from '@/composables';
import { getInputProps, getResponsiveProps } from '@/models';
import { ColorScheme, VsComponent } from '@/declaration';
import { utils } from '@/utils';

import type { VsSwitchStyleSet } from './types';

const name = VsComponent.VsSwitch;
export default defineComponent({
    name,
    props: {
        ...getInputProps<any, 'noClear' | 'placeholder'>('noClear', 'placeholder'),
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSwitchStyleSet> },
        beforeChange: {
            type: Function as PropType<(from: any, to: any) => Promise<boolean> | null>,
            default: null,
        },
        checked: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false },
        trueLabel: { type: String, default: 'ON' },
        falseLabel: { type: String, default: 'OFF' },
        trueValue: { type: null, default: true },
        falseValue: { type: null, default: false },
        // v-model
        modelValue: { type: null, default: null },
    },
    emits: ['update:modelValue', 'update:changed', 'change', 'update:valid', 'focus', 'blur'],
    // expose: ['clear', 'validate', 'focus', 'blur'],
    setup(props, context) {
        const {
            colorScheme,
            styleSet,
            disabled,
            id,
            messages,
            readonly,
            required,
            rules,
            beforeChange,
            checked,
            trueValue,
            falseValue,
            multiple,
            modelValue,
            state,
            noDefaultRules,
        } = toRefs(props);

        const switchRef: Ref<HTMLInputElement | null> = ref(null);

        const { emit } = context;

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet(name, styleSet);

        const inputValue = ref(modelValue.value);

        const {
            isMatched: isChecked,
            getInitialValue,
            getClearedValue,
            getUpdatedValue,
            addTrueValue,
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
                        if (multiple.value) {
                            // 초기 input value를 공유할 수 없기 때문에 getUpdatedValue를 사용하지 않음
                            addTrueValue();
                        } else {
                            inputValue.value = getUpdatedValue(true);
                        }
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

        const { stateClasses } = useStateClass(computedState);

        async function onClick() {
            if (computedDisabled.value || computedReadonly.value) {
                return;
            }

            const toValue = getUpdatedValue(!isChecked.value);

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
            switchRef.value?.focus();
        }

        function blur() {
            switchRef.value?.blur();
        }

        return {
            computedId,
            switchRef,
            inputValue,
            colorSchemeClass,
            computedStyleSet,
            computedDisabled,
            computedReadonly,
            isChecked,
            onClick,
            onFocus,
            onBlur,
            computedMessages,
            shake,
            validate,
            clear,
            stateClasses,
            focus,
            blur,
            convertToString: utils.string.convertToString,
        };
    },
});
</script>

<style lang="scss" src="./VsSwitch.scss" />
