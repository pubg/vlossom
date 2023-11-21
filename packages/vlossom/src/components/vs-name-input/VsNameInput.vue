<template>
    <div :style="{ width: computedWidth }">
        <div class="label" v-if="noLabel" v-show="label">{{ label }}</div>
        <input class="first-name" :placeholder="placeholderFirstName" @change.stop />
        <input class="last-name" :placeholder="placeholderLastName" @change.stop />
        <button class="clear-btn" type="button" @click.stop="clear">clear</button>
        <div class="messages" v-if="noMsg">
            <div class="message" v-for="message in computedMessages" :key="message.state">{{ message.message }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, computed, defineComponent, ref } from 'vue';

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
    emits: ['update:modelValue', 'change', 'blur', 'focus', 'clear'],
    setup() {
        const computedMessages: ComputedRef<StateMessage[]> = computed(() => []);
        const computedWidth: ComputedRef<string> = computed(() => '');
        const focused = ref(false);
        const changed = ref(false);

        function validate(): Promise<boolean> {
            return Promise.resolve(true);
        }

        function focus(): void {
            //
        }

        function blur(): void {
            //
        }

        function clear(): void {
            //
        }

        return {
            computedMessages,
            computedWidth,
            validate,
            focused,
            changed,
            focus,
            blur,
            clear,
        };
    },
});
</script>
