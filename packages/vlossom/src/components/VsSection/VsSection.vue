<template>
    <section class="vs-section">
        <div class="section-title" v-if="hasTitle">
            <h3>
                <slot name="title" />
            </h3>
        </div>
        <slot />
    </section>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';

interface SectionStyleSet {
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    margin: string;
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
    setup(_, { slots }) {
        const hasTitle = computed(() => !!slots.title);

        return {
            hasTitle,
        };
    },
});

export default VsSection;
export type VsSectionInstance = InstanceType<typeof VsSection>;
</script>

<style lang="scss" scoped src="./VsSection.scss"></style>
