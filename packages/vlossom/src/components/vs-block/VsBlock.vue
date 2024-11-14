<template>
    <vs-responsive :class="['vs-block', colorSchemeClass]" :style="computedStyleSet" :grid="grid" :width="width">
        <div v-if="hasTitle" class="vs-block-header">
            <slot name="title" />
        </div>
        <div class="vs-block-content">
            <slot />
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { getResponsiveProps } from '@/models';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

import type { VsBlockStyleSet } from './types';

const name = VsComponent.VsBlock;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsBlockStyleSet> },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsBlockStyleSet>(name, styleSet);

        const hasTitle = computed(() => !!slots.title);

        return {
            colorSchemeClass,
            computedStyleSet,
            hasTitle,
        };
    },
});
</script>

<style lang="scss" src="./VsBlock.scss" />
