<template>
    <div class="vs-page" :style="customProperties">
        <div class="page-header" v-if="hasTitle || hasDescription">
            <h2 class="page-title" v-if="hasTitle">
                <slot name="title" />
            </h2>
            <p class="page-description" v-if="hasDescription">
                <slot name="description" />
            </p>
        </div>
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useCustomStyle } from '@/composables';
import { VsComponent } from '@/declaration/types';

interface PageStyleSet {
    fontColor: string;
    headerMargin: string;
    padding: string;
}

export type VsPageStyleSet = Partial<PageStyleSet>;

const name = VsComponent.VsPage;

export default defineComponent({
    name,
    props: {
        styleSet: { type: [String, Object] as PropType<string | VsPageStyleSet>, default: '' },
    },
    setup(props, { slots }) {
        const { styleSet } = toRefs(props);

        const { customProperties } = useCustomStyle<VsPageStyleSet>(name, styleSet);

        const hasTitle = computed((): boolean => !!slots['title']);
        const hasDescription = computed((): boolean => !!slots['description']);

        return {
            customProperties,
            hasTitle,
            hasDescription,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsPage.scss" />
