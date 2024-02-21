<template>
    <div class="vs-wrapper" :class="responsiveClasses" :style="responsiveStyles">
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useResponsive } from '@/composables';
import { VsComponent, type Breakpoints } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsWrapper,
    props: {
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: null },
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
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
