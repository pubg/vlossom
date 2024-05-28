<template>
    <component :is="tag" class="vs-wrapper" :class="responsiveClasses" :style="responsiveStyles">
        <slot />
    </component>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useResponsive } from '@/composables';
import { VsComponent } from '@/declaration';

export default defineComponent({
    name: VsComponent.VsWrapper,
    props: {
        ...getResponsiveProps(),
        tag: { type: String, default: 'div' },
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
