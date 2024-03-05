<template>
    <h1>toasts.length : {{ toasts.length }}</h1>
    {{ toasts }}
    <!-- <div class="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in bottomToasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div> -->
    {{ topToasts }}
    <div id="vs-toast-view-top" class="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in topToasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
    <div id="vs-toast-view-right" class="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in rightToasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
    <div id="vs-toast-view-left" class="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in leftToasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
    <div id="vs-toast-view-bottom" class="vs-toast-view">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in bottomToasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, toRef } from 'vue';
import { store } from '@/store';
import VsToastItem from './VsToastItem.vue';
import { ToastInfo } from '@/declaration';

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

        const { toasts } = store.toastStore;

        const topToasts = computed(() => {
            return toasts.filter((toast: ToastInfo) => toast.placement === 'top');
        });
        const bottomToasts = computed(() => {
            return toasts.filter((toast: ToastInfo) => toast.placement === 'bottom');
        });
        const leftToasts = computed(() => {
            return toasts.filter((toast: ToastInfo) => toast.placement === 'left');
        });
        const rightToasts = computed(() => {
            return toasts.filter((toast: ToastInfo) => toast.placement === 'right');
        });

        return {
            toasts,
            topToasts,
            bottomToasts,
            leftToasts,
            rightToasts,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
