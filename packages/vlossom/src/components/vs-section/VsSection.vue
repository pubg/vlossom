<template>
    <vs-responsive
        tag="section"
        :class="['vs-section', colorSchemeClass]"
        :style="computedStyleSet"
        :grid="grid"
        :width="width"
    >
        <div class="vs-section-title" v-if="hasTitle">
            <slot name="title" />
        </div>
        <slot />
    </vs-responsive>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

import type { VsSectionStyleSet } from './types';

const name = VsComponent.VsSection;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSectionStyleSet> },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsSectionStyleSet>(name, styleSet);

        const hasTitle = computed(() => !!slots.title);

        return {
            colorSchemeClass,
            computedStyleSet,
            hasTitle,
        };
    },
});
</script>

<style lang="scss" src="./VsSection.scss" />
