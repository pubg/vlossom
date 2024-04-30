<template>
    <div :class="['vs-message', colorClass]">
        <vs-icon class="message-icon" :icon="icon" size="1rem" />
        <span class="message-text">{{ message.text }}</span>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { UIState, VsComponent } from '@/declaration';
import { VsIcon, iconSvgs } from '@/icons';

import type { StateMessage } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsMessage,
    components: { VsIcon },
    props: {
        message: {
            type: Object as PropType<StateMessage>,
            required: true,
        },
    },
    setup(props) {
        const { message } = toRefs(props);

        const colorClass = computed(() => {
            switch (message.value.state) {
                case UIState.Info:
                    return 'vs-blue';
                case UIState.Success:
                    return 'vs-green';
                case UIState.Warning:
                    return 'vs-yellow';
                case UIState.Error:
                    return 'vs-red';
                default:
                    return 'vs-default';
            }
        });

        const icon = computed(() => {
            if (message.value.state === UIState.Idle) {
                return 'message';
            }

            return message.value.state as keyof typeof iconSvgs;
        });

        return { colorClass, icon };
    },
});
</script>

<style lang="scss" scoped src="./VsMessage.scss" />
