<template>
    <div :style="{ width: computedWidth }">
        <div class="label" v-if="!noLabel" v-show="label">{{ label }}</div>
        <input
            class="first-name"
            :value="inputValue.firstName"
            @input="updateValue('firstName', $event)"
            :placeholder="placeholderFirstName"
            @change.stop
        />
        <input
            class="last-name"
            :value="inputValue.lastName"
            @input="updateValue('lastName', $event)"
            :placeholder="placeholderLastName"
            @change.stop
        />
        <button class="clear-btn" type="button" @click.stop="clear">clear</button>
        <div class="messages" v-if="!noMsg">
            <div class="message" v-for="message in computedMessages" :key="message.state">
                {{ message.message }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, Ref, computed, defineComponent, nextTick, onMounted, ref, toRefs, watch } from 'vue';

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
        // v-model
        modelValue: {
            type: Object as PropType<NameInputValue>,
            default: null,
        },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
    },
    expose: ['validate', 'focus', 'blur', 'clear'],
    emits: ['update:modelValue', 'update:firstName', 'update:lastName', 'change', 'blur', 'focus', 'clear'],
    setup(props, { emit }) {
        const { modelValue, firstName, lastName, messages, rules } = toRefs(props);

        const inputValue: Ref<NameInputValue> = ref({ firstName: '', lastName: '' });
        const changed = ref(false);

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
            const resolvedMessages = (await Promise.all(pendingRules)).map((resolved) => ({
                state: UIState.DANGER,
                message: resolved,
            }));
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
            if (value.firstName !== oldValue.firstName) {
                emit('update:firstName', value.firstName);
            }
            if (value.lastName !== oldValue.lastName) {
                emit('update:lastName', value.lastName);
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

        watch(firstName, (value) => {
            inputValue.value = { ...inputValue.value, firstName: value };
        });

        watch(lastName, (value) => {
            inputValue.value = { ...inputValue.value, lastName: value };
        });

        function updateValue(property: 'firstName' | 'lastName', event: Event): void {
            const target = event.target as HTMLInputElement;
            inputValue.value = { ...inputValue.value, [property]: target.value };
        }

        const isInitialized = ref(false);
        function getInitialValue() {
            return {
                firstName: firstName.value || modelValue.value?.firstName || '',
                lastName: lastName.value || modelValue.value?.lastName || '',
            };
        }
        onMounted(() => {
            inputValue.value = getInitialValue();
            nextTick(() => {
                isInitialized.value = true;
            });
        });

        const computedWidth: ComputedRef<string> = computed(() => '');
        const focused = ref(false);
        const focusedFirstName = ref(false);
        const focusedLastName = ref(false);

        function validate(): boolean {
            showRuleMessages.value = true;
            return ruleMessages.value.length === 0;
        }

        function focus(): void {
            //
        }

        function blur(): void {
            //
        }

        function clear(): void {
            inputValue.value = { firstName: '', lastName: '' };
        }

        return {
            inputValue,
            updateValue,
            showRuleMessages,
            computedMessages,
            computedWidth,
            validate,
            focused,
            focusedFirstName,
            focusedLastName,
            changed,
            focus,
            blur,
            clear,
        };
    },
});
</script>
