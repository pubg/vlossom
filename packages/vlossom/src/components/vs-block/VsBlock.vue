<template>
    <div :class="['vs-block', `vs-${computedColorScheme}`]" :style="computedStyleSet">
        <div v-if="hasTitle" class="block-header">
            <slot name="title" />
        </div>
        <div class="block-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsBlockStyleSet } from './types';

const name = VsComponent.VsBlock;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsBlockStyleSet> },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsBlockStyleSet>(name, styleSet);

        const hasTitle = computed(() => !!slots.title);

        return {
            computedColorScheme,
            computedStyleSet,
            hasTitle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsBlock.scss" />
