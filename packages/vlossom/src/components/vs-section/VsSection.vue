<template>
    <section :class="['vs-section', `vs-${computedColorScheme}`]" :style="customProperties">
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
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';

interface SectionStyleSet {
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    fontColor: string;
    padding: string;
    titleMargin: string;
}

export type VsSectionStyleSet = Partial<SectionStyleSet>;

const name = VsComponent.VsSection;

const VsSection = defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsSectionStyleSet>, default: '' },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsSectionStyleSet>(name, styleSet);

        const hasTitle = computed(() => !!slots.title);

        return {
            computedColorScheme,
            customProperties,
            hasTitle,
        };
    },
});

export default VsSection;
export type VsSectionInstance = InstanceType<typeof VsSection>;
</script>

<style lang="scss" scoped src="./VsSection.scss" />
