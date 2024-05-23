<template>
    <vs-wrapper
        :class="['vs-block', `vs-${computedColorScheme}`]"
        :style="computedStyleSet"
        :grid="grid"
        :width="width"
    >
        <div v-if="hasTitle" class="block-header">
            <slot name="title" />
        </div>
        <div class="block-content">
            <slot />
        </div>
    </vs-wrapper>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsBlockStyleSet } from './types';

const name = VsComponent.VsBlock;
export default defineComponent({
    name,
    props: {
        ...getResponsiveProps(),
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
