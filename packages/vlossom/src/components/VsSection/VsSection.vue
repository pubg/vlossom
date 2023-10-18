<template>
    <section class="vs-section" :style="customProperties">
        <div class="section-title" v-if="hasTitle">
            <h3>
                <slot name="title" />
            </h3>
        </div>
        <slot />
    </section>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getCustomStyles } from '@/composables/customStyle';

interface SectionStyleSet {
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    padding: string;
    titleMargin: string;
}

export type VsSectionStyleSet = Partial<SectionStyleSet>;

const VsSection = defineComponent({
    name: 'vs-section',
    props: {
        colorScheme: { type: String, default: 'indigo' },
        styleSet: { type: [String, Object] as PropType<string | VsSectionStyleSet>, default: '' },
    },
    setup(props, { slots }) {
        const { styleSet } = toRefs(props);

        const { customProperties } = getCustomStyles<VsSectionStyleSet>(styleSet, 'vs-section');

        const hasTitle = computed(() => !!slots.title);

        return {
            hasTitle,
            customProperties,
        };
    },
});

export default VsSection;
export type VsSectionInstance = InstanceType<typeof VsSection>;
</script>

<style lang="scss" scoped src="./VsSection.scss" />
