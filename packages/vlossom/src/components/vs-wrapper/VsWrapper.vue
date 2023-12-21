<template>
    <div :style="widthProperties" :class="widthClasses">
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useResponsiveWidth } from '@/composables';
import { VsComponent, type Breakpoints } from '@/declaration/types';

export default defineComponent({
    name: VsComponent.VsWrapper,
    props: {
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: '100%' },
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
    },
    setup(props) {
        const { width, grid } = toRefs(props);

        const { widthProperties, widthClasses } = useResponsiveWidth(width, grid);

        return {
            widthProperties,
            widthClasses,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsWrapper.scss" />
