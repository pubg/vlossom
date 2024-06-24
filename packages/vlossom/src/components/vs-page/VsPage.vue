<template>
    <div class="vs-page" :style="computedStyleSet">
        <div class="page-header" v-if="hasTitle || hasDescription">
            <div class="page-title" v-if="hasTitle">
                <slot name="title" />
            </div>
            <div class="page-description" v-if="hasDescription">
                <slot name="description" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useStyleSet } from '@/composables';
import { VsComponent } from '@/declaration';

import type { VsPageStyleSet } from './types';

const name = VsComponent.VsPage;
export default defineComponent({
    name,
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsPageStyleSet> },
    },
    setup(props, { slots }) {
        const { styleSet } = toRefs(props);

        const { computedStyleSet } = useStyleSet<VsPageStyleSet>(name, styleSet);

        const hasTitle = computed((): boolean => !!slots['title']);
        const hasDescription = computed((): boolean => !!slots['description']);

        return {
            computedStyleSet,
            hasTitle,
            hasDescription,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsPage.scss" />
