<template>
    <div :class="['vs-message', colorClass, { 'vs-dense': dense }]">
        <vs-icon class="vs-message-icon" :icon="icon" :size="dense ? '1.4rem' : '1.6rem'" />
        <span class="vs-message-text">{{ message.text }}</span>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { VsComponent } from '@/declaration';
import { VsIcon, iconSvgs } from '@/icons';

import type { StateMessage } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsMessage,
    components: { VsIcon },
    props: {
        dense: { type: Boolean, default: false },
        message: {
            type: Object as PropType<StateMessage>,
            required: true,
        },
    },
    setup(props) {
        const { message } = toRefs(props);

        const colorClass = computed(() => {
            switch (message.value.state) {
                case 'info':
                    return 'vs-blue';
                case 'success':
                    return 'vs-green';
                case 'warning':
                    return 'vs-yellow';
                case 'error':
                    return 'vs-red';
                default:
                    return 'vs-default';
            }
        });

        const icon = computed(() => {
            if (message.value.state === 'idle') {
                return 'message';
            }

            return message.value.state as keyof typeof iconSvgs;
        });

        return { colorClass, icon };
    },
});
</script>

<style lang="scss" src="./VsMessage.scss" />
