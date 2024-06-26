<template>
    <vs-bar-node
        :color-scheme="computedColorScheme"
        :style-set="computedStyleSet"
        :height="height"
        :position="position"
        :primary="primary"
    >
        <slot />
    </vs-bar-node>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, watch, inject, type PropType, getCurrentInstance } from 'vue';
import { useColorScheme, useLayout, useStyleSet } from '@/composables';
import { VsBarNode } from '@/nodes';
import { VS_LAYOUT, VsComponent, APP_LAYOUT_Z_INDEX, LAYOUT_Z_INDEX } from '@/declaration';

import type { ColorScheme, CssPosition } from '@/declaration';
import type { VsHeaderStyleSet } from './types';

const name = VsComponent.VsHeader;
export default defineComponent({
    name,
    components: { VsBarNode },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsHeaderStyleSet> },
        height: { type: String, default: '30px' },
        position: { type: String as PropType<CssPosition>, default: 'absolute' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, position, height } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: headerStyleSet } = useStyleSet<VsHeaderStyleSet>(name, styleSet);

        const defaultPositionStyle = computed(() => {
            const style: { [key: string]: string | number } = {};

            if (position.value === 'absolute' || position.value === 'fixed') {
                style['--vs-header-top'] = 0;
                style['--vs-header-left'] = 0;
            }

            if (position.value === 'absolute') {
                style['--vs-header-zIndex'] = LAYOUT_Z_INDEX;
            } else if (position.value === 'fixed') {
                style['--vs-header-zIndex'] = APP_LAYOUT_Z_INDEX;
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return { ...defaultPositionStyle.value, ...headerStyleSet.value };
        });

        // only for vs-layout children
        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
            const { getDefaultLayoutProvide } = useLayout();
            const { setHeaderLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

            watch(
                [position, height],
                ([newPosition, newHeight]) => {
                    setHeaderLayout({ position: newPosition, height: newHeight });
                },
                { immediate: true },
            );
        }

        return {
            computedColorScheme,
            computedStyleSet,
        };
    },
});
</script>
