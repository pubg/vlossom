<template>
    <div :class="['vs-toast-view', `vs-toast-view-${placement}`]">
        <TransitionGroup name="fade">
            <vs-toast-item v-for="toast in toasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, type PropType } from 'vue';
import { store } from '@/store';
import VsToastItem from './VsToastItem.vue';
import { ToastInfo } from '@/declaration';

import type { Placement, Align } from '@/declaration';

export default defineComponent({
    name: 'VsToastView',
    components: { VsToastItem },
    props: {
        placement: { type: String as PropType<Exclude<Placement, 'left' | 'right'>>, required: true },
        align: { type: String as PropType<Align>, required: true },
    },
    setup(props) {
        const { placement, align } = toRefs(props);
        const toasts = computed(() => {
            return store.toast.toasts.filter(
                (toast: ToastInfo) => toast.placement === placement.value && toast.align === align.value,
            );
        });

        return {
            toasts,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
