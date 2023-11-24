<template>
    <div :class="['vs-name-input']" :style="{ width: typeof width === 'string' ? computedWidth : computedGridWidth }">
        <div class="label" v-if="!noLabel" v-show="label">{{ label }}</div>

        <input
            class="first-name"
            ref="firstInputRef"
            :value="inputValue.firstName"
            :placeholder="placeholderFirstName"
            @input="updateFirstValue($event)"
        />

        <input
            class="last-name"
            ref="lastInputRef"
            :value="inputValue.lastName"
            :placeholder="placeholderLastName"
            @input="updateLastValue($event)"
        />

        <button v-if="!isEmptyInputValue" class="clear-btn" @click="clear"> X </button>

        <div class="messages" v-if="!noMsg">
            <div class="message" v-for="message in computedMessages" :key="message.state">{{ message.message }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { reduceEachTrailingCommentRange } from 'typescript';
import { defineComponent, PropType, Ref, ref, toRefs, computed, onMounted, ComputedRef, watch, nextTick } from 'vue';

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

interface GridWidth {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
}

interface Grid {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export interface NameInputValue {
    firstName: string;
    lastName: string;
}

const RESP_XL = 1200;
const RESP_LG = 992;
const RESP_MD = 768;
const RESP_SM = 576;

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
        width: { type: [String, Object] as PropType<string | GridWidth>, default: '100%' },

        // v-model
        modelValue: { type: Object as PropType<NameInputValue>, default: () => null },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
    },
    emits: [
        'change',
        'update:modelValue',
        'update:firstName',
        'update:lastName',
        'focus',
        'blur',
        'enter',
        'clear',
        'init',
        'update:valid',
    ],
    expose: ['focus', 'blur', 'select', 'clear'],
    setup(props, { emit }) {
        const {
            modelValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            width,
            messages,
            rules,
        } = toRefs(props);

        const firstInputRef: Ref<HTMLInputElement | null> = ref(null);
        const lastInputRef: Ref<HTMLInputElement | null> = ref(null);

        const focused = ref(false);
        const changed = ref(false);
        const valid = ref(false);

        // two-way binding
        function initInputValue() {
            let initialInputValue = { firstName: '', lastName: '' };

            if (modelValue.value) {
                initialInputValue = modelValue.value;
            }
            if (firstNameValue.value) {
                initialInputValue.firstName = firstNameValue.value;
            }
            if (lastNameValue.value) {
                initialInputValue.lastName = lastNameValue.value;
            }

            return initialInputValue;
        }

        const inputValue: Ref<NameInputValue> = ref(initInputValue());

        onMounted(() => {
            nextTick(() => {
                emit('init', inputValue.value);
                emit('update:modelValue', inputValue.value);
                checkRules(inputValue.value);
            });
        });

        watch(
            modelValue,
            () => {
                if (inputValue.value === modelValue.value) {
                    return;
                }
                inputValue.value = modelValue.value || { firstName: '', lastName: '' };
                emitValue(inputValue.value);
            },
            { deep: true },
        );

        watch(
            firstNameValue,
            () => {
                if (inputValue.value.firstName === firstNameValue.value) {
                    return;
                }
                inputValue.value.firstName = firstNameValue.value || '';
                emitValue(inputValue.value);
            },
            { deep: true },
        );

        watch(
            lastNameValue,
            () => {
                if (inputValue.value.lastName === lastNameValue.value) {
                    return;
                }
                inputValue.value.lastName = lastNameValue.value || '';
                emitValue(inputValue.value);
            },
            { deep: true },
        );

        function emitValue(v: NameInputValue) {
            emit('update:modelValue', v);
            emit('update:firstName', v.firstName);
            emit('update:lastName', v.lastName);
            checkRules(inputValue.value);
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

        //width
        const computedWidth: ComputedRef<string> = computed(() => {
            if (!(typeof width.value === 'string')) {
                return '';
            }

            return width.value;
        });

        const containerWidth = ref(
            Number(document.getElementById('container')?.style.width.replace('px;', '')) || window.innerWidth,
        );

        const computedGridWidth: ComputedRef<string> = computed(() => {
            if (!(typeof width.value === 'object')) {
                return '';
            }
            if (containerWidth.value >= RESP_XL) {
                return width.value.xl || '100%';
            } else if (containerWidth.value >= RESP_LG) {
                return width.value.lg || '100%';
            } else if (containerWidth.value >= RESP_MD) {
                return width.value.md || '100%';
            } else if (containerWidth.value >= RESP_SM) {
                return width.value.sm || '100%';
            } else {
                return width.value.xs || '100%';
            }
        });

        // messages
        const originalMessages: Ref<StateMessage[]> = ref([]);
        const dangerMessagesFromRules: Ref<StateMessage[]> = ref([]);

        watch(
            messages,
            async () => {
                const promises: PromiseLike<StateMessage>[] = [];

                messages.value.forEach((message) => {
                    if (!(typeof message === 'function')) {
                        originalMessages.value.push(message);
                        return;
                    }

                    const result = message(inputValue.value);
                    if (result instanceof Promise) {
                        promises.push(result);
                    } else {
                        originalMessages.value.push(result as StateMessage);
                    }
                });

                const promiseResult = await Promise.all(promises);
                originalMessages.value = [...originalMessages.value, ...promiseResult];
            },
            { immediate: true },
        );

        const computedMessages: ComputedRef<StateMessage[]> = computed(() => {
            if (!changed.value) {
                return originalMessages.value;
            }
            return [...originalMessages.value, ...dangerMessagesFromRules.value];
        });

        // rules & validate

        function checkRules(v: NameInputValue) {
            const rulePromises = rules.value.map((rule) => {
                const ruleResult = rule(v);
                return Promise.resolve(ruleResult).then((resultValue) => resultValue);
            });

            Promise.all(rulePromises).then((results) => {
                const resultMessages = results
                    .filter((result) => !!result)
                    .map((message) => ({
                        state: UIState.DANGER,
                        message,
                    }));

                dangerMessagesFromRules.value = resultMessages;

                const isValid = resultMessages.length === 0;
                valid.value = isValid;
                emit('update:valid', isValid);
            });
        }

        function validate(): boolean {
            if (!changed.value) {
                checkRules(inputValue.value);
                emit('change', inputValue.value);
                changed.value = true;
            }
            return valid.value;
        }

        // focus & blur
        function focus() {
            focused.value = true;
            firstInputRef.value?.focus();
            emit('focus');
        }

        function blur(): void {
            focused.value = false;
            firstInputRef.value?.blur();
            emit('blur');
        }

        // clear
        function clear() {
            inputValue.value.firstName = '';
            inputValue.value.lastName = '';
            emitValue(inputValue.value);
            emit('clear');
        }

        return {
            inputValue,
            firstInputRef,
            lastInputRef,
            isEmptyInputValue,
            computedMessages,
            computedWidth,
            computedGridWidth,
            focused,
            changed,
            updateFirstValue,
            updateLastValue,
            validate,
            focus,
            blur,
            clear,
        };
    },
});

export default VsNameInput;
export type VsNameInputInstance = InstanceType<typeof VsNameInput>;
</script>

<style lang="scss" scoped src="./VsNameInput.scss" />
