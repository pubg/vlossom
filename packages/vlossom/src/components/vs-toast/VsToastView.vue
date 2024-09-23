<template>
    <div :class="['vs-toast-view', `vs-toast-view-${placement}`, `vs-toast-view-${align}`]">
        <TransitionGroup name="fade" appear>
            <vs-toast
                v-for="toast in toasts"
                :key="toast.id"
                :id="toast.id"
                :content="toast.content"
                :color-scheme="toast.colorScheme"
                :style-set="toast.styleSet"
                :auto-close="toast.autoClose"
                :primary="toast.primary"
            />
        </TransitionGroup>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, type PropType } from 'vue';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';
import VsToast from './VsToast.vue';

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

        return { toasts };
    },
});
</script>

<style lang="scss" src="./VsToastView.scss" />
