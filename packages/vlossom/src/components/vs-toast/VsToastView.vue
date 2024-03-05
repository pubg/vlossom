<template>
    <div id="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in toasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VsToastItem from './VsToastItem.vue';
import { store } from '@/store';

export default defineComponent({
    name: 'VsToastView',
    components: { VsToastItem },
    props: {
        hasContainer: { type: Boolean, default: false },
    },
    setup() {
        console.log('Toast View Rendered', store.toastStore.toasts);
        return {
            toasts: store.toastStore.toasts,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
