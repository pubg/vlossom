<template>
    <div :class="['vs-name-input', { disabled: disabled }]" :style="{ width: computedWidth }">
        <div class="label" v-if="noLabel" v-show="label">{{ label }}</div>

        <input
            class="first-name"
            ref="firstInputRef"
            :value="inputValue.firstName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholderFirstName"
            @input="updateFirstValue($event)"
            @focus="onFocus"
            @blur="onBlur"
        />

        <input
            class="last-name"
            ref="lastInputRef"
            :value="inputValue.lastName"
            :disabled="disabled"
            :readonly="readonly"
            :placeholder="placeholderLastName"
            @input="updateLastValue($event)"
            @focus="onFocus"
            @blur="onBlur"
        />

        <button v-if="!noClear && !isEmptyInputValue && !readonly && !disabled" class="clear-button" @click="clear">
            X
        </button>
        {{ inputValue }}

        <div class="messages" v-if="noMsg">
            <div class="message" v-for="message in computedMessages" :key="message.state">{{ message.message }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, toRefs, computed, onBeforeMount, ComputedRef, watch } from 'vue';

export enum UIState {
    IDLE = 'idle',
    SUCCESS = 'success',
    INFO = 'info',
    DANGER = 'danger',
    WARN = 'warning',
    SELECTED = 'selected',
}

export interface StateMessage {
    state: UIState;
    message: string;
}
type Rules<T = any> = (((v: T) => string) | ((v: T) => PromiseLike<string>))[];
type Messages<T = any> = (StateMessage | ((v: T) => StateMessage) | ((v: T) => PromiseLike<StateMessage>))[];

interface Grid {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}

export interface NameInputValue {
    firstName: string;
    lastName: string;
}

const VsNameInput = defineComponent({
    name: 'vs-name-input',
    props: {
        grid: { type: Object as PropType<Grid>, default: () => ({}) },
        label: { type: String, default: '' },
        messages: { type: Array as PropType<Messages<NameInputValue>>, default: () => [] },
        noLabel: { type: Boolean, default: false },
        noMsg: { type: Boolean, default: false },
        placeholderFirstName: { type: String, default: 'first name' },
        placeholderLastName: { type: String, default: 'last name' },
        rules: { type: Array as PropType<Rules<NameInputValue>>, default: () => [] },
        width: { type: [String, Object] as PropType<string | Grid>, default: '100%' },

        // add
        disabled: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        noClear: { type: Boolean, default: false },
        visible: { type: Boolean, default: true },

        // v-model
        modelValue: { type: Object as PropType<NameInputValue>, default: () => null },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
    },
    // emits: ['change', 'update:modelValue', 'focus', 'blur', 'enter', 'clear'],
    expose: ['focus', 'blur', 'select', 'clear'],
    setup(props, { emit }) {
        const { modelValue, firstName: firstNameValue, lastName: lastNameValue } = toRefs(props);
        const computedMessages: ComputedRef<StateMessage[]> = computed(() => []);
        const computedWidth: ComputedRef<string> = computed(() => '');
        const focused = ref(false);
        const changed = ref(false);

        const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
        const lastInputRef: Ref<HTMLInputElement | null> = ref(null);

        const inputValue: Ref<NameInputValue> = ref(modelValue.value || { firstName: '', lastName: '' });

        onBeforeMount(() => {
            if (firstNameValue.value) {
                inputValue.value.firstName = firstNameValue.value;
            }

            if (lastNameValue.value) {
                inputValue.value.lastName = lastNameValue.value;
            }
        });

        watch(modelValue, () => {
            inputValue.value = modelValue.value;
        });

        function emitValue(v: any) {
            emit('update:modelValue', v);
            emit('change', v);
            changed.value = true;
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

        function validate(): Promise<boolean> {
            return Promise.resolve(true);
        }

        function focus() {
            firstInputRef.value?.focus();
            lastInputRef.value?.focus();
        }

        function blur(): void {
            //
        }

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

        return {
            inputValue,
            firstInputRef,
            lastInputRef,
            isEmptyInputValue,
            computedMessages,
            computedWidth,
            focused,
            changed,
            updateFirstValue,
            updateLastValue,
            validate,
            focus,
            blur,
            clear,
            onFocus,
            onBlur,
        };
    },
});

export default VsNameInput;
export type VsNameInputInstance = InstanceType<typeof VsNameInput>;
</script>

<style lang="scss" scoped src="./VsNameInput.scss" />
