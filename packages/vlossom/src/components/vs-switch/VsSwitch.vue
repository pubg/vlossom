<template>
    <vs-wrapper :width="width" :grid="grid" v-show="visible">
        <vs-input-wrapper
            :id="id"
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

            <div :class="['vs-switch', `vs-${computedColorScheme}`]">
                <div
                    ref="switchRef"
                    role="switch"
                    :class="['vs-switch-button', boxGlowByState, { checked: isChecked, disabled, readonly }]"
                    :style="computedStyleSet"
                    :aria-checked="isChecked"
                    :aria-disabled="disabled"
                    :aria-labelledby="id ? id : undefined"
                    :aria-readonly="readonly"
                    :aria-required="required"
                    tabindex="0"
                    :disabled="disabled"
                    @click.stop="toggle()"
                    @keydown.space.prevent.stop="toggle()"
                    @keydown.enter.prevent.stop="toggle()"
                    @focus.stop="onFocus"
                    @blur.stop="onBlur"
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
                    @change.stop="toggle()"
                />
            </div>
            <template #messages v-if="!noMessage">
                <slot name="messages" />
            </template>
        </vs-input-wrapper>
    </vs-wrapper>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed, ref, Ref } from 'vue';
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
import VsWrapper from '@/components/vs-wrapper/VsWrapper.vue';

import type { VsSwitchStyleSet } from './types';

const name = VsComponent.VsSwitch;
export default defineComponent({
    name,
    components: { VsWrapper },
    props: {
        ...getInputProps<any, ['noClear', 'placeholder']>('noClear', 'placeholder'),
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
    expose: ['clear', 'validate', 'focus', 'blur'],
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
            checked,
            trueValue,
            falseValue,
            multiple,
            modelValue,
            state,
        } = toRefs(props);

        const switchRef: Ref<HTMLInputElement | null> = ref(null);

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
        } = useValueMatcher(multiple, inputValue, trueValue, falseValue);

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

        async function toggle() {
            if (disabled.value || readonly.value) {
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
            switchRef,
            inputValue,
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
            focus,
            blur,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsSwitch.scss" />
