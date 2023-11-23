<template>
    <vs-label v-if="!noLabel" v-show="label" :required="required">{{ label }}</vs-label>

    <div tabindex="0">hi</div>
    <input
        class="first-name"
        ref="firstInputRef"
        :value="firstValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholderFirstName"
        @input="onInput($event, 'firstName')"
        @focus="onFocus('firstName')"
        @blur="onBlur('firstName')"
    />
    <input
        class="last-name"
        ref="lastInputRef"
        :value="lastValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholderLastName"
        @input="onInput($event, 'lastName')"
        @focus="onFocus('lastName')"
        @blur="onBlur('lastName')"
    />
    <vs-message v-if="computedMessages.length" :messages="computedMessages" />
    <button class="clear-btn" type="button" @click.stop="clear">clear</button>
    {{ firstValue }}
    {{ lastValue }}
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, toRefs, watch } from 'vue';
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
    expose: ['focusFirstName', 'focusLastName', 'blur', 'clear', 'validate'],
    setup(props, { emit }) {
        const { modelValue, firstName, lastName, rules, messages } = toRefs(props);

        const firstFocused = ref(false);
        const lastFocused = ref(false);
        const focused = computed(() => firstFocused.value || lastFocused.value);

        const changed = ref(false);

        const { checkVModel } = useModel();
        const hasVModel = checkVModel('modelValue');
        const hasFirstVModel = checkVModel('firstName');
        const hasLastVModel = checkVModel('lastName');

        const internalFirstValue = ref(modelValue.value?.firstName || '');

        const firstValue = computed({
            get() {
                if (!hasFirstVModel.value && !hasVModel.value) {
                    return internalFirstValue.value;
                }

                return modelValue.value?.firstName || '';
            },
            set(v: string) {
                internalFirstValue.value = v;

                emit('update:firstName', v);
                emit('update:modelValue', { firstName: v, lastName: internalLastValue.value });
            },
        });

        const internalLastValue = ref(modelValue.value?.lastName || '');

        const lastValue = computed({
            get() {
                if (!hasLastVModel.value && !hasVModel.value) {
                    return internalLastValue.value;
                }

                return modelValue.value?.lastName || '';
            },
            set(v: string) {
                internalLastValue.value = v;

                emit('update:lastName', v);
                emit('update:modelValue', { firstName: internalFirstValue.value, lastName: v });
            },
        });

        watch(
            firstName,
            (v: string) => {
                if (v) {
                    firstValue.value = v;
                }
            },
            { immediate: true },
        );

        watch(
            lastName,
            (v: string) => {
                if (v) {
                    lastValue.value = v;
                }
            },
            { immediate: true },
        );

        onBeforeMount(() => {
            if (!modelValue.value) {
                firstValue.value = '';
                lastValue.value = '';
            }
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
        }

        function onFocus(type: 'firstName' | 'lastName') {
            if (type === 'firstName') {
                firstFocused.value = true;
            } else {
                lastFocused.value = true;
            }
            emit('focus');
        }

        function onBlur(type: 'firstName' | 'lastName') {
            if (type === 'firstName') {
                firstFocused.value = false;
            } else {
                lastFocused.value = false;
            }
            emit('blur');
        }

        const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
        const lastInputRef: Ref<HTMLInputElement | null> = ref(null);

        function blur() {
            firstInputRef.value?.blur();
            lastInputRef.value?.blur();
        }

        function clear() {
            firstValue.value = '';
            lastValue.value = '';
        }

        // validation
        const validationMessages: Ref<StateMessage[]> = ref([]);

        function validate() {
            return validationMessages.value.length === 0;
        }

        function composeValidationMessages() {
            validationMessages.value = [];

            const promises = rules.value.map((rule) => {
                return rule(inputValue.value);
            });

            Promise.all(promises).then((results) => {
                results.forEach((result) => {
                    if (result) {
                        validationMessages.value.push({ state: UIState.DANGER, message: result });
                    }
                });

                return validationMessages.value.length > 0;
            });
        }

        watch(
            rules,
            () => {
                composeValidationMessages();
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
            composeValidationMessages();
            composeMessages();
        });

        return {
            focused,
            firstFocused,
            lastFocused,
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
            firstInputRef,
            lastInputRef,
            // focusFirstName,
            // focusLastName,
            blur,
            clear,
            validate,
            validationMessages,
            calculatedMessages,
        };
    },
});
</script>
