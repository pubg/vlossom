<template>
    <vs-bar-node
        :color-scheme="computedColorScheme"
        :style-set="{ ...defaultInsetStyle, ...computedStyleSet }"
        :height="height"
        :position="position"
        :primary="primary"
        :verticalAlign="verticalAlign"
    >
        <slot />
    </vs-bar-node>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsBarNode } from '@/nodes';
import { VsComponent } from '@/declaration';

import type { Align, ColorScheme, CssPosition } from '@/declaration';
import type { VsHeaderStyleSet } from './types';

const name = VsComponent.VsHeader;
export default defineComponent({
    name,
    components: { VsBarNode },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsHeaderStyleSet>, default: '' },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet, position } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsHeaderStyleSet>(name, styleSet);

        const defaultInsetStyle = computed(() => {
            const style: { [ley: string]: any } = {};

            if (position.value === 'absolute' || position.value === 'fixed') {
                style['--vs-header-top'] = 0;
                style['--vs-header-left'] = 0;
            }

            return style;
        });

        return {
            computedColorScheme,
            computedStyleSet,
            defaultInsetStyle,
        };
    },
});
</script>
