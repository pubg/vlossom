<template>
    <div :class="['vs-toast-view', `vs-toast-view-${placement}`]">
        <TransitionGroup name="fade" appear>
            <vs-toast ref="toastRefs" v-for="toast in toasts" :key="toast.id" :toastInfo="toast" />
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
import { store } from '@/stores';
import VsToast from './VsToast.vue';
import { VsComponent } from '@/declaration';

import type { Placement, Align } from '@/declaration';
import type { ToastInfo } from '@/plugins';

const name = VsComponent.VsToastView;
export default defineComponent({
    name,
    components: { VsToast },
    props: {
        align: { type: String as PropType<Align>, required: true },
        placement: { type: String as PropType<Exclude<Placement, 'left' | 'right'>>, required: true },
    },
    setup(props) {
        const { placement, align } = toRefs(props);
        const toasts = computed(() => {
            return store.toast.toasts.filter(
                (toast: ToastInfo) => toast.placement === placement.value && toast.align === align.value,
            );
        });

        const toastRefs: ShallowRef<(typeof VsToast)[]> = shallowRef([]);

        function handleKeyPress(event: KeyboardEvent) {
            if (!toastRefs.value.length) {
                return;
            }

            if (event.key === 'Tab' && event.shiftKey === false) {
                event.preventDefault();
                toastRefs.value[0].$refs.closeButtonRef?.focus();
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
            toastRefs,
        };
    },
});
</script>

<style src="./VsToastView.scss" scoped />
