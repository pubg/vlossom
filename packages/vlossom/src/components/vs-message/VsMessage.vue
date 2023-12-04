<template>
    <div class="vs-message">
        {{ message.state }}
        <!-- <vn-icon class="icon" size="1.6rem">{{ icon }}</vn-icon> -->
        <span class="text">{{ message.message }}</span>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { StateMessage } from '@/declaration/types';

const VsMessage = defineComponent({
    name: 'vs-message',
    props: {
        message: { type: Object as PropType<StateMessage>, required: true, default: () => ({}) },
    },
});

export default VsMessage;
export type VsMessageInstance = InstanceType<typeof VsMessage>;
</script>

<style lang="scss" scoped src="./VsMessage.scss" />
