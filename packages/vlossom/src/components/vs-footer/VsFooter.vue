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
import { defineComponent, toRefs, computed, watch, inject, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsBarNode } from '@/nodes';
import { VsComponent } from '@/declaration';

import type { Align, ColorScheme, CssPosition } from '@/declaration';
import type { VsFooterStyleSet } from './types';
import type { LayoutAttrs } from '../vs-layout/types';

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
        layout: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position, layout } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet: footerStyleSet } = useStyleSet<VsFooterStyleSet>(name, styleSet);

        const defaultInsetStyle = computed(() => {
            const style: { [ley: string]: any } = {};

            if (position.value === 'absolute' || position.value === 'fixed') {
                style['--vs-footer-bottom'] = 0;
                style['--vs-footer-left'] = 0;
            }

            return style;
        });

        const computedStyleSet = computed(() => {
            return { ...footerStyleSet.value, ...defaultInsetStyle.value };
        });

        const layoutAttrs: LayoutAttrs | undefined = inject('layoutAttrs');
        watch(
            computedStyleSet,
            (style) => {
                if (!layout.value || !layoutAttrs) {
                    return;
                }
                layoutAttrs.footer = {
                    position: position.value || style['--vs-footer-position'] || 'static',
                    height: height.value || style['--vs-footer-height'] || 'auto',
                };
            },
            { immediate: true, deep: true },
        );

        return {
            computedColorScheme,
            computedStyleSet,
        };
    },
});
</script>
