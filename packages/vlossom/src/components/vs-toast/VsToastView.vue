<template>
    <template v-for="filteredToasts in toastsGroups" :key="filteredToasts.direction">
        <div :class="['vs-toast-view', `vs-toast-view-${filteredToasts.placement}`]">
            <TransitionGroup name="fade">
                <vs-toast-item v-for="toast in filteredToasts.toasts" :key="toast.id" :toastInfo="toast" />
            </TransitionGroup>
        </div>
    </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { store } from '@/store';
import VsToastItem from './VsToastItem.vue';
import { ToastInfo } from '@/declaration';

export default defineComponent({
    name: 'VsToastView',
    components: { VsToastItem },
    setup() {
        const positions = ['top-center', 'top-start', 'top-end', 'bottom-center', 'bottom-start', 'bottom-end'];
        const toastsGroups = computed(() => {
            return positions.map((position) => {
                const [placement, align] = position.split('-');
                return {
                    position,
                    placement,
                    align,
                    toasts: store.toastStore.toasts.filter(
                        (toast: ToastInfo) => toast.placement === placement && toast.align === align,
                    ),
                };
            });
        });

        return {
            toastsGroups,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
