<template>
    <div class="vs-layout" :style="layoutStyles">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, reactive, computed } from 'vue';
import { VsComponent } from '@/declaration';

import type { LayoutAttrs } from './types';

export default defineComponent({
    name: VsComponent.VsLayout,
    setup() {
        const navOn = ref(false);
        const layoutAttrs: LayoutAttrs = reactive({});

        provide('navOn', navOn);
        provide('layoutAttrs', layoutAttrs);

        const layoutStyles = computed(() => {
            const style: { [key: string]: string | number } = {
                paddingTop: 0,
                paddingBottom: 0,
            };

            if (layoutAttrs.header) {
                const { position, height } = layoutAttrs.header;
                if (position === 'fixed' || position === 'absolute') {
                    style.paddingTop = height;
                }
            }
            if (layoutAttrs.footer) {
                const { position, height } = layoutAttrs.footer;
                if (position === 'fixed' || position === 'absolute') {
                    style.paddingBottom = height;
                }
            }
            return style;
        });
        return { navOn, layoutStyles };
    },
});
</script>
