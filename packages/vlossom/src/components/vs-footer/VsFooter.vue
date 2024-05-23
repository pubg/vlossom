<template>
    <vs-bar-node
        :color-scheme="computedColorScheme"
        :style-set="computedStyleSet"
        :height="height"
        :position="position"
        :primary="primary"
        :vertical-align="verticalAlign"
    >
        <slot />
    </vs-bar-node>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, watch, inject, type PropType, getCurrentInstance } from 'vue';
import { useColorScheme, useLayout, useStyleSet } from '@/composables';
import { VsBarNode } from '@/nodes';
import { VS_LAYOUT, VsComponent } from '@/declaration';

import type { Align, ColorScheme, CssPosition } from '@/declaration';
import type { VsFooterStyleSet } from './types';

const name = VsComponent.VsFooter;
export default defineComponent({
    name,
    components: { VsBarNode },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFooterStyleSet> },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: footerStyleSet } = useStyleSet<VsFooterStyleSet>(name, styleSet);

        const defaultInsetStyle = computed(() => {
            const style: { [ley: string]: any } = {};

            if (position.value === 'absolute' || position.value === 'fixed') {
                style['--vs-footer-bottom'] = 0;
                style['--vs-footer-left'] = 0;
            }

            if (position.value === 'absolute') {
                style['--vs-footer-zIndex'] = 100; // var(bar-z-index)
            }

            if (position.value === 'fixed') {
                style['--vs-footer-zIndex'] = 1000; // var(app-bar-z-index)
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return { ...defaultInsetStyle.value, ...footerStyleSet.value };
        });

        // only for vs-layout children
        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
            const { getDefaultLayoutProvide } = useLayout();
            const { setFooterLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

            watch(
                [position, height],
                ([newPosition, newHeight]) => {
                    setFooterLayout(newPosition, newHeight);
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
