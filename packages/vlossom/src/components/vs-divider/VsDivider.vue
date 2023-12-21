<template>
    <div class="vs-divider" :class="[`vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties" />
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';

interface DividerStyleSet {
    lineColor: string;
    lineStyle: string;
    lineWidth: string;
    verticalHeight: string;
}

export type VsDividerStyleSet = Partial<DividerStyleSet>;

const name = VsComponent.VsDivider;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsDividerStyleSet>, default: '' },
        vertical: { type: Boolean, default: false },
        mobileFull: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, mobileFull, vertical } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsDividerStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            horizontal: !vertical.value,
            vertical: vertical.value,
            'mobile-full': mobileFull.value,
        }));

        return {
            computedColorScheme,
            customProperties,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsDivider.scss" />
