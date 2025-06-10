<template>
    <div
        :class="['vs-toast', colorSchemeClass, { 'vs-primary': toast.primary }]"
        :style="computedStyleSet"
        role="alert"
    >
        <div class="vs-toast-content">
            <vs-content-renderer :content="toast.content" />
        </div>
        <button
            v-if="!toast.autoClose"
            class="vs-toast-close"
            type="button"
            @click.prevent.stop="closeToast"
            aria-label="close"
        >
            <vs-icon icon="close" size="14px" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsIcon } from '@/icons';
import { store } from '@/stores';
import { VsComponent } from '@/declaration';
import VsContentRenderer from './../vs-content-renderer/VsContentRenderer.vue';

import type { VsToastInfo, VsToastStyleSet } from './types';

const name = VsComponent.VsToast;
export default defineComponent({
    name,
    components: { VsContentRenderer, VsIcon },
    props: {
        toast: { type: Object as PropType<VsToastInfo>, required: true },
    },
    setup(props) {
        const { toast } = toRefs(props);

        const colorScheme = computed(() => toast.value.colorScheme);
        const styleSet = computed(() => toast.value.styleSet);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsToastStyleSet>(name, styleSet);

        function closeToast() {
            store.toast.remove(toast.value.id);
        }

        return {
            colorSchemeClass,
            computedStyleSet,
            closeToast,
        };
    },
});
</script>

<style lang="scss" src="./VsToast.scss" />
