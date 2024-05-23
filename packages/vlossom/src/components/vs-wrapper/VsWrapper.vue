<template>
    <component :is="tag" class="vs-wrapper" :class="responsiveClasses" :style="responsiveStyles">
        <slot />
    </component>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useResponsive } from '@/composables';
import { VsComponent, type Breakpoints } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsWrapper,
    props: {
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
        tag: { type: String, default: 'div' },
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: null },
    },
    setup(props) {
        const { width, grid } = toRefs(props);

        const { responsiveClasses, responsiveStyles } = useResponsive(width, grid);

        return {
            responsiveClasses,
            responsiveStyles,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsWrapper.scss" />
