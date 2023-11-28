<template>
    <div :style="widthProperties" :class="widthClasses">
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useResponsiveWidth } from '@/composables';
import type { Breakpoints } from '@/declaration/types';

const VsWrapper = defineComponent({
    name: 'vs-wrapper',
    props: {
        width: { type: [String, Object] as PropType<string | Breakpoints>, default: '100%' },
        grid: { type: Object as PropType<Breakpoints>, default: () => ({}) },
    },
    setup(props) {
        const { width, grid } = toRefs(props);

        const { widthVariables, widthClasses } = useResponsiveWidth(
            computed(() => (typeof width.value === 'string' ? {} : width.value)),
            grid,
        );

        const widthProperties = computed(() => {
            if (typeof width.value === 'string') {
                return {
                    width: width.value,
                };
            }

            return widthVariables.value;
        });

        return {
            widthProperties,
            widthClasses,
        };
    },
});

export default VsWrapper;
export type VsWrapperInstance = InstanceType<typeof VsWrapper>;
</script>

<style lang="scss" scoped src="./VsWrapper.scss" />
