<template>
    <div :class="['vs-divider', colorSchemeClass, classObj]" :style="computedStyleSet" />
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

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsDividerStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            'vs-horizontal': !vertical.value,
            'vs-vertical': vertical.value,
            'vs-divider-responsive': responsive.value,
        }));

        return {
            colorSchemeClass,
            computedStyleSet,
            classObj,
        };
    },
});
</script>

<style lang="scss" src="./VsDivider.scss" />
