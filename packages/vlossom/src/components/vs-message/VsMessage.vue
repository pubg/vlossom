<template>
    <div class="vs-message">
        {{ message.state }}
        <!-- <vn-icon class="icon" size="1.6rem">{{ icon }}</vn-icon> -->
        <span class="text">{{ message.message }}</span>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { StateMessage, VsComponent } from '@/declaration/types';

export default defineComponent({
    name: VsComponent.VsMessage,
    props: {
        message: { type: Object as PropType<StateMessage>, required: true, default: () => ({}) },
    },
});
</script>

<style lang="scss" scoped src="./VsMessage.scss" />
