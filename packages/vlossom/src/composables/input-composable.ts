import { ComputedRef, PropType, Ref, computed, nextTick, onMounted, ref, watch } from 'vue';
import { StateMessage, Rule, Message, UIState, InputComponentOptions } from '@/declaration/types';
import { useInputForm } from './input-form-composable';

export function getInputProps<T = unknown>() {
    return {
        disabled: { type: Boolean, default: false },
        label: { type: String, default: '' },
        messages: { type: Array as PropType<Message<T>[]>, default: () => [] },
        noClear: { type: Boolean, default: false },
        noLabel: { type: Boolean, default: false },
        noMsg: { type: Boolean, default: false },
        placeholder: { type: String, default: '' },
        readonly: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        rules: { type: Array as PropType<Rule<T>[]>, default: () => [] },
        visible: { type: Boolean, default: true },

        // v-model
        changed: { type: Boolean, default: false },
        valid: { type: Boolean, default: false },
    };
}

export function useInput<T = unknown>(
    inputValue: Ref<T>,
    modelValue: Ref<T>,
    ctx: any,
    label: Ref<string>,
    options?: InputComponentOptions<T>,
) {
    const { emit } = ctx;
    const { messages = ref([]), rules = ref([]) } = options || {};

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

    const showRuleMessages = ref(false);
    const ruleMessages: Ref<StateMessage[]> = ref([]);
    async function checkRules() {
        ruleMessages.value = [];
        const pendingRules: Promise<string>[] = [];

        rules.value.forEach((rule) => {
            const result = rule(inputValue.value);
            if (!result) {
                return;
            }
            if (result instanceof Promise) {
                pendingRules.push(result);
            } else {
                ruleMessages.value.push({ state: UIState.DANGER, message: result as string });
            }
        });

        if (pendingRules.length === 0) {
            return;
        }
        const resolvedMessages = (await Promise.all(pendingRules)).reduce((acc: StateMessage[], resolved) => {
            if (resolved) {
                acc.push({
                    state: UIState.DANGER,
                    message: resolved,
                });
            }

            return acc;
        }, []);

        ruleMessages.value.push(...resolvedMessages);
    }
    watch(rules, checkRules, { deep: true });

    const computedMessages: ComputedRef<StateMessage[]> = computed(() => {
        if (showRuleMessages.value) {
            return [...innerMessages.value, ...ruleMessages.value];
        }

        return innerMessages.value;
    });

    watch(inputValue, (value, oldValue) => {
        emit('update:modelValue', value);
        if (options?.callbacks?.onChange) {
            options.callbacks.onChange(value, oldValue);
        }

        checkMessages();
        checkRules();

        if (!isInitialized.value) {
            return;
        }
        changed.value = true;
        showRuleMessages.value = true;
        emit('change', value);
    });

    watch(
        modelValue,
        (value) => {
            inputValue.value = value;
        },
        { deep: true },
    );

    watch(changed, () => {
        emit('update:changed', changed.value);
    });

    const valid = computed(() => ruleMessages.value.length === 0);
    watch(valid, () => {
        emit('update:valid', valid.value);
    });

    onMounted(() => {
        inputValue.value = modelValue.value;
        checkMessages();
        checkRules();

        if (options?.callbacks?.onMounted) {
            options.callbacks?.onMounted();
        }
        nextTick(() => {
            isInitialized.value = true;
        });
    });

    const shake = ref(false);
    function validate(): boolean {
        showRuleMessages.value = true;
        const isValid = ruleMessages.value.length === 0;
        if (!isValid) {
            shake.value = !shake.value;
        }
        return isValid;
    }

    function clear() {
        if (options?.callbacks?.onClear) {
            options.callbacks.onClear();
        }

        nextTick(() => {
            changed.value = false;
        });
    }

    useInputForm(label, changed, valid, validate, clear);

    return {
        changed,
        valid,
        shake,
        computedMessages,
        showRuleMessages,
        validate,
        clear,
    };
}
