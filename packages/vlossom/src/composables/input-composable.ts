import { ComputedRef, PropType, Ref, computed, nextTick, onMounted, ref, watch } from 'vue';
import { useInputForm } from './input-form-composable';
import { UIState } from '@/declaration';
import { utils } from '@/utils';

import type { StateMessage, Rule, Message, InputComponentParams } from '@/declaration';

interface VsInputProps<T> {
    disabled: { type: BooleanConstructor; default: boolean };
    label: { type: StringConstructor; default: string };
    messages: { type: PropType<Message<T>[]>; default: () => Message<T>[] };
    name: { type: StringConstructor; default: string };
    noClear: { type: BooleanConstructor; default: boolean };
    noDefaultRules: { type: BooleanConstructor; default: boolean };
    noLabel: { type: BooleanConstructor; default: boolean };
    noMessage: { type: BooleanConstructor; default: boolean };
    placeholder: { type: StringConstructor; default: string };
    readonly: { type: BooleanConstructor; default: boolean };
    required: { type: BooleanConstructor; default: boolean };
    rules: { type: PropType<Rule<T>[]>; default: () => Rule<T>[] };
    state: { type: PropType<UIState>; default: UIState };
    visible: { type: BooleanConstructor; default: boolean };

    // v-model
    changed: { type: BooleanConstructor; default: boolean };
    valid: { type: BooleanConstructor; default: boolean };
}

export function getInputProps<T = unknown, K extends Array<keyof VsInputProps<T>> = Array<keyof VsInputProps<T>>>(
    ...excludes: K
): Omit<VsInputProps<T>, K[number]> {
    const inputProps: VsInputProps<T> = Object.assign(
        {},
        {
            disabled: { type: Boolean, default: false },
            label: { type: String, default: '' },
            messages: { type: Array as PropType<Message<T>[]>, default: () => [] },
            name: { type: String, default: '' },
            noClear: { type: Boolean, default: false },
            noDefaultRules: { type: Boolean, default: false },
            noLabel: { type: Boolean, default: false },
            noMessage: { type: Boolean, default: false },
            placeholder: { type: String, default: '' },
            readonly: { type: Boolean, default: false },
            required: { type: Boolean, default: false },
            rules: { type: Array as PropType<Rule<T>[]>, default: () => [] },
            state: { type: String as PropType<UIState>, default: UIState.Idle },
            visible: { type: Boolean, default: true },

            // v-model
            changed: { type: Boolean, default: false },
            valid: { type: Boolean, default: false },
        },
    );

    return utils.object.omit(inputProps, excludes);
}

export function useInput<T = unknown>(ctx: any, inputParams: InputComponentParams<T>) {
    const { emit } = ctx;
    const {
        inputValue,
        modelValue,
        label,
        disabled = ref(false),
        readonly = ref(false),
        messages = ref([]),
        rules = ref([]),
        defaultRules = [],
        noDefaultRules = ref(false),
        state = ref(UIState.Idle),
        callbacks = {},
    } = inputParams;

    const changed = ref(false);
    const isInitialized = ref(false);

    const innerMessages: Ref<StateMessage[]> = ref([]);
    async function checkMessages() {
        innerMessages.value = [];
        const pendingMessages: Promise<StateMessage>[] = [];

        messages.value.forEach((message) => {
            if (typeof message === 'function') {
                const result = message(inputValue.value);
                if (result instanceof Promise) {
                    pendingMessages.push(result);
                } else {
                    innerMessages.value.push(result as StateMessage);
                }
            } else {
                innerMessages.value.push(message);
            }
        });

        if (pendingMessages.length === 0) {
            return;
        }
        const resolvedMessages = await Promise.all(pendingMessages);
        innerMessages.value.push(...resolvedMessages);
    }
    watch(messages, checkMessages, { deep: true });

    const computedRules = computed(() => {
        if (noDefaultRules.value) {
            return rules.value;
        }

        return [...defaultRules, ...rules.value];
    });
    const showRuleMessages = ref(false);
    const ruleMessages: Ref<StateMessage[]> = ref([]);
    async function checkRules() {
        ruleMessages.value = [];
        const pendingRules: Promise<string>[] = [];

        computedRules.value.forEach((rule) => {
            const result = rule(inputValue.value);
            if (!result) {
                return;
            }
            if (result instanceof Promise) {
                pendingRules.push(result);
            } else {
                ruleMessages.value.push({ state: UIState.Error, text: result as string });
            }
        });

        if (pendingRules.length === 0) {
            return;
        }
        const resolvedMessages = (await Promise.all(pendingRules)).reduce((acc: StateMessage[], resolved) => {
            if (resolved) {
                acc.push({
                    state: UIState.Error,
                    text: resolved,
                });
            }

            return acc;
        }, []);

        ruleMessages.value.push(...resolvedMessages);
    }
    watch(computedRules, checkRules, { deep: true });

    const computedMessages: ComputedRef<StateMessage[]> = computed(() => {
        if (showRuleMessages.value) {
            return [...innerMessages.value, ...ruleMessages.value];
        }

        return innerMessages.value;
    });

    watch(
        inputValue,
        (value, oldValue) => {
            emit('update:modelValue', value);
            if (callbacks.onChange) {
                callbacks.onChange(value, oldValue);
            }

            checkMessages();
            checkRules();

            if (!isInitialized.value) {
                return;
            }
            changed.value = true;
            showRuleMessages.value = true;
            emit('change', value);
        },
        { deep: true },
    );

    watch(
        modelValue,
        (value) => {
            if (value === inputValue.value) {
                return;
            }
            inputValue.value = value;
        },
        { deep: true },
    );

    const valid = computed(() => ruleMessages.value.length === 0);
    watch(valid, () => {
        emit('update:valid', valid.value);
    });

    onMounted(() => {
        if (callbacks.onMounted) {
            callbacks.onMounted();
        }

        checkMessages();
        checkRules();

        nextTick(() => {
            isInitialized.value = true;
        });
    });

    const shake = ref(false);
    function validate(): boolean {
        showRuleMessages.value = true;
        if (!valid.value) {
            shake.value = !shake.value;
        }
        return valid.value;
    }

    function clear() {
        if (callbacks.onClear) {
            callbacks.onClear();
        }

        nextTick(() => {
            checkMessages();
            checkRules();
            showRuleMessages.value = false;
            changed.value = false;
        });
    }

    const { id, formDisabled, formReadonly } = useInputForm(label, valid, changed, validate, clear);

    const computedDisabled = computed(() => disabled.value || formDisabled.value);

    const computedReadonly = computed(() => readonly.value || formReadonly.value);

    watch(changed, () => {
        emit('update:changed', changed.value);
    });

    const computedState = computed(() => (showRuleMessages.value && !valid.value ? UIState.Error : state.value));

    return {
        changed,
        valid,
        shake,
        computedMessages,
        showRuleMessages,
        validate,
        clear,
        id,
        computedDisabled,
        computedReadonly,
        computedState,
    };
}
