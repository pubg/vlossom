<template>
    <vs-label v-if="noLabel" v-show="label" :required="required">{{ label }}</vs-label>
    <div tabindex="0">hi</div>
    <input
        class="first-name"
        ref="inputRef"
        :value="firstValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholderFirstName"
        @input="onInput($event, 'firstName')"
        @focus="onFocus"
        @blur="onBlur"
    />
    <input
        class="last-name"
        :value="lastValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholderLastName"
        @input="onInput($event, 'lastName')"
        @focus="onFocus"
        @blur="onBlur"
    />
    <vs-message v-if="computedMessages.length" :messages="computedMessages" />
    <button class="clear-btn" type="button" @click.stop="clear">clear</button>
    {{ firstValue }}
    {{ lastValue }}
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref, toRefs, watch } from 'vue';
import VsLabel from './VsLabel.vue';
import VsMessage from './VsMessage.vue';
import { useModel } from './useModel';

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

export default defineComponent({
    components: { VsLabel, VsMessage },
    name: 'vs-name-input',
    props: {
        label: { type: String, default: '' },
        noLabel: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        placeholderFirstName: { type: String, default: 'first name' },
        placeholderLastName: { type: String, default: 'last name' },
        readonly: { type: Boolean, default: false },
        rules: { type: Array as PropType<Rules<NameInputValue>>, default: () => [] },
        messages: { type: Object as PropType<Messages<NameInputValue>>, default: () => ({}) },
        // v-model
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        modelValue: { type: Object as PropType<NameInputValue | null>, default: null },
    },
    emits: ['update:modelValue', 'update:firstName', 'update:lastName', 'change', 'focus', 'blur'],
    expose: ['focus', 'blur', 'clear', 'validate'],
    setup(props, { emit }) {
        const { modelValue, firstName, lastName, rules, messages } = toRefs(props);

        const focused = ref(false);
        const changed = ref(false);

        const { checkVModel } = useModel();
        const hasVModel = checkVModel('modelValue');
        const hasFirstVModel = checkVModel('firstName');
        const hasLastVModel = checkVModel('lastName');

        const internalFirstValue = ref(firstName.value || modelValue.value?.firstName || '');

        const firstValue = computed({
            get() {
                if (!hasFirstVModel.value && !hasVModel.value) {
                    return internalFirstValue.value;
                }

                return firstName.value || modelValue.value?.firstName || '';
            },
            set(v: string) {
                internalFirstValue.value = v;

                emit('update:firstName', v);
                emit('update:modelValue', { firstName: v, lastName: internalLastValue.value });
            },
        });

        const internalLastValue = ref(lastName.value || modelValue.value?.lastName || '');

        const lastValue = computed({
            get() {
                if (!hasLastVModel.value && !hasVModel.value) {
                    return internalLastValue.value;
                }

                return lastName.value || modelValue.value?.lastName || '';
            },
            set(v: string) {
                internalLastValue.value = v;

                emit('update:lastName', v);
                emit('update:modelValue', { firstName: internalFirstValue.value, lastName: v });
            },
        });

        const inputValue = computed(() => ({ firstName: firstValue.value, lastName: lastValue.value }));

        watch(inputValue, () => {
            emit('change', inputValue.value);
            changed.value = true;
        });

        function onInput(e: Event, type: 'firstName' | 'lastName') {
            const target = e.target as HTMLInputElement;
            const targetValue = target.value || '';

            if (type === 'firstName') {
                firstValue.value = targetValue;
            } else {
                lastValue.value = targetValue;
            }

            // if (props.modelModifiers?.trim) {
            //     // TODO
            // }
        }

        function onFocus() {
            focused.value = true;
            emit('focus');
        }

        function onBlur() {
            focused.value = false;
            emit('blur');
        }

        const inputRef: Ref<HTMLInputElement | null> = ref(null);

        function focus() {
            inputRef.value?.focus();
        }

        function blur() {
            inputRef.value?.blur();
        }

        function clear() {
            firstValue.value = '';
            lastValue.value = '';
        }

        // validation
        const validationMessages: Ref<StateMessage[]> = ref([]);

        function validate() {
            validationMessages.value = [];

            const promises = rules.value.map((rule) => {
                return rule(inputValue.value);
            });

            Promise.all(promises).then((results) => {
                results.map((result) => {
                    if (result) {
                        validationMessages.value.push({ state: UIState.DANGER, message: result });
                    }
                });
            });

            return validationMessages.value.length > 0;
        }

        watch(
            rules,
            () => {
                validate();
            },
            { immediate: true },
        );

        // using messages prop
        const calculatedMessages: Ref<StateMessage[]> = ref([]);

        async function composeMessages() {
            calculatedMessages.value = [];

            const promises = messages.value.map((message) => {
                if (typeof message === 'function') {
                    return message(inputValue.value);
                } else {
                    return message;
                }
            });

            calculatedMessages.value = (await Promise.all(promises)).filter((v) => !!v) as StateMessage[];
        }

        const computedMessages = computed(() => {
            return [...validationMessages.value, ...calculatedMessages.value];
        });

        watch(
            messages,
            () => {
                composeMessages();
            },
            { immediate: true },
        );

        watch(inputValue, () => {
            validate();
            composeMessages();
        });

        return {
            focused,
            changed,
            hasVModel,
            hasFirstVModel,
            hasLastVModel,
            firstValue,
            lastValue,
            computedMessages,
            onInput,
            onFocus,
            onBlur,
            inputRef,
            focus,
            blur,
            clear,
            validate,
            validationMessages,
            calculatedMessages,
        };
    },
});
</script>
