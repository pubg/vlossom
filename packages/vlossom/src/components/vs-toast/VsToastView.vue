<template>
    <div id="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in toasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { store } from '@/store';
import VsToastItem from './VsToastItem.vue';

export default defineComponent({
    name: 'VsToastView',
    components: { VsToastItem },
    setup() {
        console.log('Toast View Rendered', store.toastStore.toasts);

        function onPressEsc(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                event.preventDefault();
                store.toastStore.removeOldest();
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', onPressEsc);
        });

        return {
            toasts: store.toastStore.toasts,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
