<template>
    <div :class="['vs-toast-view', `vs-toast-view-${placement}`]">
        <TransitionGroup name="fade">
            <vs-toast-item ref="toastItemRefs" v-for="toast in toasts" :key="toast.id" :toastInfo="toast" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    toRefs,
    onBeforeUnmount,
    onMounted,
    shallowRef,
    type PropType,
    type ShallowRef,
} from 'vue';
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

        const toastItemRefs: ShallowRef<(typeof VsToastItem)[]> = shallowRef([]);

        function handleKeyPress(event: KeyboardEvent) {
            if (!toastItemRefs.value.length) {
                return;
            }

            if (event.key === 'Tab' && event.shiftKey === false) {
                event.preventDefault();
                toastItemRefs.value[0].$refs.closeButtonRef.focus();
            }
        }

        onMounted(() => {
            document.addEventListener('keydown', handleKeyPress);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('keydown', handleKeyPress);
        });

        return {
            toasts,
            toastItemRefs,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
