<template>
    <div :class="['vs-name-input', `vs-${computedColorScheme}`, { disabled: disabled }]" :style="customProperties">
        <input
            class="input"
            ref="inputRef"
            :value="inputValue.firstName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="updateValue($event)"
            @keyup.enter="onEnter"
            @focus="onFocus"
            @blur="onBlur"
        />

        <input
            class="input"
            ref="inputRef"
            :value="inputValue.lastName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="updateValue($event)"
            @keyup.enter="onEnter"
            @focus="onFocus"
            @blur="onBlur"
        />

        <button v-if="!noClear && inputValue && !readonly && !disabled" class="clear-button"> X </button>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme } from '@/declaration/types';

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

export interface InputButton {
    icon?: string;
    action?: (value: string | number) => void;
}

export interface Name {
    firstName: string;
    lastName: string;
}

const VsNameInput = defineComponent({
    name: 'vs-name-input',
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
        // v-model
        modelValue: { type: Object as PropType<Name>, default: () => ({ firstName: '', lastName: '' }) },
    },
    emits: ['change', 'update:modelValue', 'focus', 'blur', 'enter', 'clear'],
    expose: ['focus', 'blur', 'select', 'clear'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, modelValue } = toRefs(props);

        const { computedColorScheme } = useColorScheme(colorScheme, 'vsInput', 'indigo');

        const { customProperties } = useCustomStyle<VsInputStyleSet>(styleSet, 'input');

        const inputRef: Ref<HTMLInputElement | null> = ref(null);

        const inputValue: ComputedRef<Name> = computed(() => {
            return modelValue.value || { firstName: '', lastName: '' };
        });

        function emitValue(v: Name) {
            emit('update:modelValue', v);
            emit('change', v);
        }

        // function convertValue(v: string | number | null | undefined): string | number {
        //     if (!v) {
        //         return type.value === InputType.TEXT ? '' : 0;
        //     }

        //     if (type.value === InputType.TEXT) {
        //         return v.toString();
        //     } else {
        //         return Number(v);
        //     }
        // }

        function updateValue(event: Event) {
            console.log(event);
            const target = { firstName: inputValue.value.firstName, lastName: inputValue.value.lastName };
            console.log(target);
            // const targetValue = target.value || '';
            // const converted = convertValue(targetValue);
            emitValue(target as Name);
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

        // function clear() {
        //     const emptyValue = convertValue(null);
        //     emitValue(emptyValue);

        //     emit('clear');
        // }

        function onFocus() {
            emit('focus');
        }

        function onBlur() {
            emit('blur');
        }

        // function onEnter() {
        //     emit('enter');

        //     const prependAction = prepend.value?.action;
        //     const appendAction = append.value?.action;

        //     if (prependAction) {
        //         excuteButtonAction(prependAction);
        //     }

        //     if (appendAction) {
        //         excuteButtonAction(appendAction);
        //     }
        // }

        return {
            computedColorScheme,
            customProperties,
            inputValue,
            inputRef,
            updateValue,
            focus,
            blur,
            select,
            // clear,
            onFocus,
            onBlur,
            // onEnter,
        };
    },
});

export default VsNameInput;
export type VsNameInputInstance = InstanceType<typeof VsNameInput>;
</script>

<style lang="scss" scoped src="./VsNameInput.scss" />
