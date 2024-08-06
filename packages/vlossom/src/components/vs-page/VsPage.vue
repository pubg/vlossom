<template>
    <div :class="['vs-page', colorSchemeClass]" :style="computedStyleSet">
        <div class="vs-page-header" v-if="hasTitle || hasDescription">
            <div class="vs-page-title" v-if="hasTitle">
                <slot name="title" />
            </div>
            <div class="vs-page-description" v-if="hasDescription">
                <slot name="description" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsPageStyleSet } from './types';

const name = VsComponent.VsPage;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsPageStyleSet> },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsPageStyleSet>(name, styleSet);

        const hasTitle = computed((): boolean => !!slots['title']);
        const hasDescription = computed((): boolean => !!slots['description']);

        return {
            colorSchemeClass,
            computedStyleSet,
            hasTitle,
            hasDescription,
        };
    },
});
</script>

<style lang="scss" src="./VsPage.scss" />
