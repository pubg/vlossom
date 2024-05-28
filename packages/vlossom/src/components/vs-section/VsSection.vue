<template>
    <vs-wrapper
        tag="section"
        :class="['vs-section', `vs-${computedColorScheme}`]"
        :style="computedStyleSet"
        :grid="grid"
        :width="width"
    >
        <div class="section-title" v-if="hasTitle">
            <h3>
                <slot name="title" />
            </h3>
        </div>
        <slot />
    </vs-wrapper>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsSectionStyleSet } from './types';

const name = VsComponent.VsSection;
export default defineComponent({
    name,
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSectionStyleSet> },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsSectionStyleSet>(name, styleSet);

        const hasTitle = computed(() => !!slots.title);

        return {
            computedColorScheme,
            computedStyleSet,
            hasTitle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsSection.scss" />
