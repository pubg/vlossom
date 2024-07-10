<template>
    <progress :value="value" :max="max" :class="['vs-progress', colorSchemeClass]" :style="computedStyleSet" />
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsProgressStyleSet } from './types';

const name = VsComponent.VsProgress;
export default defineComponent({
    name: name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsProgressStyleSet> },
        max: { type: Number, default: 100 },
        value: { type: Number, default: 0 },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsProgressStyleSet>(name, styleSet);

        return {
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style src="./VsProgress.scss" scoped />
