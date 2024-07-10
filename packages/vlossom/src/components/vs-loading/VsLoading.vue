<template>
    <div :class="['vs-loading', colorSchemeClass]" :style="computedStyleSet">
        <div class="vs-rect1" />
        <div class="vs-rect2" />
        <div class="vs-rect3" />
        <div class="vs-rect4" />
        <div class="vs-rect5" />
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsLoadingStyleSet } from './types';

const name = VsComponent.VsLoading;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsLoadingStyleSet> },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsLoadingStyleSet>(name, styleSet);

        return {
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsLoading.scss" />
