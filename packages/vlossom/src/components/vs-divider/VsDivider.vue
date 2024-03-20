<template>
    <div class="vs-divider" :class="[`vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet" />
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsDividerStyleSet } from './types';

const name = VsComponent.VsDivider;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDividerStyleSet> },
        responsive: { type: Boolean, default: false },
        vertical: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, responsive, vertical } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsDividerStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            horizontal: !vertical.value,
            vertical: vertical.value,
            responsive: responsive.value,
        }));

        return {
            computedColorScheme,
            computedStyleSet,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDivider.scss" />
