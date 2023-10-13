<template>
    <div class="vs-input" :class="{ disabled: disabled }">
        <vs-button v-if="prepend" :color-scheme="colorScheme" @click="excuteButtonAction(prepend.action)"> </vs-button>

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

        <vs-button v-if="append" :color-scheme="colorScheme" @click="excuteButtonAction(append.action)"> </vs-button>

        <button
            v-if="!noClear && inputValue && !readonly && !disabled"
            class="clear-button"
            :class="{ number: type === InputType.NUMBER }"
            @click.stop="clearWithFocus()"
        ></button>
    </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { VsButton } from '@/components/VsButton';

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

const VsInput = defineComponent({
    name: 'vs-input',
    components: { VsButton },
    props: {
        colorScheme: { type: String, default: 'indigo' },
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
        const { disabled, readonly, prepend, append, type, modelValue, value } = toRefs(props);

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

            if (prepend.value && prepend.value.action) {
                excuteButtonAction(prepend.value.action);
            }

            if (append.value && append.value.action) {
                excuteButtonAction(append.value.action);
            }
        }

        return {
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
