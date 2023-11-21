<template>
    <div :class="['vs-name-input', { disabled: disabled }]" :style="{ width: width }">
        <vs-label class="label" v-if="noLabel === false && label" :required="required">
            <span v-html="label"></span>
        </vs-label>

        <input
            class="first-name"
            ref="firstInputRef"
            :value="inputValue.firstName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="updateFirstValue($event)"
            @keyup.enter="onEnter"
            @focus="onFocus"
            @blur="onBlur"
        />

        <input
            class="last-name"
            ref="lastInputRef"
            :value="inputValue.lastName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholder"
            @input="updateLastValue($event)"
            @keyup.enter="onEnter"
            @focus="onFocus"
            @blur="onBlur"
        />

        <button v-if="!noClear && !isEmptyInputValue && !readonly && !disabled" class="clear-button" @click="clear">
            X
        </button>
        {{ inputValue }}

        <div class="message-group relative flex flex-align-center" v-if="noMsg === false">
            <vs-message v-for="(message, index) in messages" :key="index" :state="message.state" :text="message.text" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs, computed, onBeforeMount } from 'vue';
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

        // label
        label: { type: String, default: '' },
        messages: { type: Array as PropType<any[]>, default: () => [] as any[] }, // type 재정의 필요
        noLabel: { type: Boolean, default: false },
        noMsg: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        visible: { type: Boolean, default: true },
        width: { type: String, default: '' },

        // v-model
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        modelValue: { type: Object as PropType<Name>, default: () => ({ firstName: '', lastName: '' }) },
    },
    emits: ['change', 'update:modelValue', 'focus', 'blur', 'enter', 'clear'],
    expose: ['focus', 'blur', 'select', 'clear'],
    setup(props, { emit }) {
        const { modelValue, firstName: firstNameValue, lastName: lastNameValue } = toRefs(props);

        const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
        const lastInputRef: Ref<HTMLInputElement | null> = ref(null);

        const inputValue: Ref<Name> = ref(modelValue.value || { firstName: '', lastName: '' });

        onBeforeMount(() => {
            if (firstNameValue.value) {
                inputValue.value.firstName = firstNameValue.value;
            }

            if (lastNameValue.value) {
                inputValue.value.lastName = lastNameValue.value;
            }
        });

        function emitValue(v: any) {
            emit('update:modelValue', v);
            emit('change', v);
        }

        const isEmptyInputValue = computed(() => {
            return inputValue.value.firstName === '' && inputValue.value.lastName === '';
        });

        function updateFirstValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = target.value || '';
            inputValue.value.firstName = targetValue;
            emitValue(inputValue.value);
        }

        function updateLastValue(event: Event) {
            const target = event.target as HTMLInputElement;
            const targetValue = target.value || '';
            inputValue.value.lastName = targetValue;
            emitValue(inputValue.value);
        }

        function focus() {
            firstInputRef.value?.focus();
            lastInputRef.value?.focus();
        }

        // function blur() {
        //     inputRef.value?.blur();
        // }

        // function select() {
        //     inputRef.value?.select();
        // }

        function clear() {
            inputValue.value.firstName = '';
            inputValue.value.lastName = '';
            emitValue(inputValue.value);
            emit('clear');
        }

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
            inputValue,
            firstInputRef,
            lastInputRef,
            isEmptyInputValue,
            updateFirstValue,
            updateLastValue,
            focus,
            blur,
            // select,
            clear,
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
