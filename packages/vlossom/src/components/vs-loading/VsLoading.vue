<template>
    <div :class="['vs-loading', `vs-${computedColorScheme}`]" :style="computedStyleSet">
        <div class="rect1" />
        <div class="rect2" />
        <div class="rect3" />
        <div class="rect4" />
        <div class="rect5" />
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

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsLoadingStyleSet>(name, styleSet);

        return {
            computedColorScheme,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsLoading.scss" />
