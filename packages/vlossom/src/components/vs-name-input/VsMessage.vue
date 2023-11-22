<template>
    <div class="messages">
        <div
            class="message"
            v-for="message in messages"
            :key="message.state + message.message"
            :class="[message.state]"
        >
            <vn-icon class="icon" size="1.6rem">{{ getIcon(message.state) }}</vn-icon>
            <span class="message">{{ message.message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { UIState, StateMessage } from './VsNameInput.vue';

export default defineComponent({
    name: 'vs-message',
    props: {
        messages: { type: Array as PropType<StateMessage[]>, default: () => [] },
    },
    methods: {
        getIcon(state: string): string {
            switch (state) {
                case UIState.INFO:
                    return 'info';
                case UIState.SUCCESS:
                    return 'check_circle';
                case UIState.WARN:
                    return 'warning';
                case UIState.DANGER:
                    return 'error';
                default:
                    return 'chat_bubble';
            }
        },
    },
});
</script>
