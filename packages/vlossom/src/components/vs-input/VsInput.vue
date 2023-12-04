<template>
    <div :class="['vs-input', `vs-${computedColorScheme}`, { disabled: disabled }]" :style="customProperties">
        <button class="action-button prepend" v-if="prepend" @click="excuteButtonAction(prepend.action)">
            Prepend
        </button>

        <input
            class="input"
            ref="inputRef"
            :type="type"
            :value="inputValue"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="updateValue($event)"
            @keyup.enter="onEnter"
            @focus="onFocus"
            @blur="onBlur"
        />

        <button class="action-button append" v-if="append" @click="excuteButtonAction(append.action)">Append</button>

        <button
            v-if="!noClear && inputValue && !readonly && !disabled"
            class="clear-button"
            :class="{ number: type === InputType.NUMBER }"
            @click.stop="clearWithFocus()"
        >
            X
        </button>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponents } from '@/declaration/types';

interface InputStyleSet {
    appendBackgroundColor: string;
    appendColor: string;
    backgroundColor: string;
    border: string;
    borderRadius: string;
    clearButtonColor: string;
    fontColor: string;
    height: string;
    prependBackgroundColor: string;
    prependColor: string;
}

export type VsInputStyleSet = Partial<InputStyleSet>;

export enum InputType {
    TEXT = 'text',
    NUMBER = 'number',
}

export interface InputButton {
    icon?: string;
    action?: (value: string | number) => void;
}

const name = VsComponents.VsInput;

const VsInput = defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme>, default: '' },
        styleSet: { type: [String, Object] as PropType<string | VsInputStyleSet>, default: '' },
        disabled: { type: Boolean, default: false },
        noClear: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        append: {
            type: Object as PropType<InputButton>,
            default: null,
        },
        prepend: {
            type: Object as PropType<InputButton>,
            default: null,
        },
        type: { type: String, default: InputType.TEXT },
        value: { type: [String, Number], default: '' },
        // v-model
        modelValue: { type: [String, Number], default: '' },
    },
    emits: ['change', 'update:modelValue', 'focus', 'blur', 'enter', 'clear'],
    expose: ['focus', 'blur', 'select', 'clear'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, disabled, readonly, prepend, append, type, modelValue, value } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsInputStyleSet>(name, styleSet);

        const inputRef: Ref<HTMLInputElement | null> = ref(null);

        const inputValue: ComputedRef<string | number> = computed(() => {
            return modelValue.value || value.value || (type.value === InputType.NUMBER ? 0 : '');
        });

        function emitValue(v: string | number) {
            emit('update:modelValue', v);
            emit('change', v);
        }

        function convertValue(v: string | number | null | undefined): string | number {
            if (!v) {
                return type.value === InputType.TEXT ? '' : 0;
            }

            if (type.value === InputType.TEXT) {
                return v.toString();
            } else {
                return Number(v);
            }
        }

        function updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = target.value || '';
            const converted = convertValue(targetValue);
            emitValue(converted);
        }

        function excuteButtonAction(action: InputButton['action']) {
            if (!action || disabled.value || readonly.value) {
                return;
            }

            action(inputValue.value);
        }

        function focus() {
            inputRef.value?.focus();
        }

        function blur() {
            inputRef.value?.blur();
        }

        function select() {
            inputRef.value?.select();
        }

        function clear() {
            const emptyValue = convertValue(null);
            emitValue(emptyValue);

            emit('clear');
        }

        function clearWithFocus() {
            clear();
            focus();
        }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
        }

        function onEnter() {
            emit('enter');

            const prependAction = prepend.value?.action;
            const appendAction = append.value?.action;

            if (prependAction) {
                excuteButtonAction(prependAction);
            }

            if (appendAction) {
                excuteButtonAction(appendAction);
            }
        }

        return {
            computedColorScheme,
            customProperties,
            InputType,
            inputValue,
            inputRef,
            updateValue,
            excuteButtonAction,
            focus,
            blur,
            select,
            clear,
            clearWithFocus,
            onFocus,
            onBlur,
            onEnter,
        };
    },
});

export default VsInput;
export type VsInputInstance = InstanceType<typeof VsInput>;
</script>

<style lang="scss" scoped src="./VsInput.scss" />
