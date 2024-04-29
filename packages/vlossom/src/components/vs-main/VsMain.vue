<template>
    <main class="vs-main" :style="layoutStyle">
        <slot />
    </main>
</template>

<script lang="ts">
import { computed, inject, defineComponent } from 'vue';
import { Placement, SIZES, Size, VsComponent } from '@/declaration';

import type { LayoutAttrs } from '../vs-layout/types';

const name = VsComponent.VsMain;
export default defineComponent({
    name,
    setup() {
        const navOn = inject('navOn');
        const layoutAttrs: LayoutAttrs | undefined = inject('layoutAttrs');

        function getPaddingPercentage(size: string, placement: Placement) {
            if (!size) {
                if (placement === 'top' || placement === 'bottom') {
                    return '20%';
                }

                if (placement === 'left' || placement === 'right') {
                    return '16%';
                }
                return '0%';
            }

            if (!SIZES.includes(size as Size)) {
                return size;
            }

            const verticalSizes = {
                xs: '12%',
                sm: '20%',
                md: '32%',
                lg: '60%',
                xl: '80%',
            };

            const horizontalSizes = {
                xs: '10%',
                sm: '16%',
                md: '32%',
                lg: '60%',
                xl: '80%',
            };

            const sizeMap = placement === 'left' || placement === 'right' ? horizontalSizes : verticalSizes;
            return sizeMap[size as Size];
        }

        function applyPadding(placement: Placement, size: string, isNavOn: boolean) {
            const style: { [key: string]: string | number } = {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
            };
            const paddingProperty = `padding${placement.charAt(0).toUpperCase() + placement.slice(1)}`;
            const percentage = getPaddingPercentage(size, placement);
            style[paddingProperty] = isNavOn ? percentage : 0;
            return style;
        }

        const layoutStyle = computed(() => {
            if (!layoutAttrs?.drawer) {
                return {};
            }
            const { placement, size } = layoutAttrs.drawer;

            const isNavOn = typeof navOn === 'object' && navOn !== null && 'value' in navOn && !!navOn.value;
            return applyPadding(placement, size, isNavOn);
        });
        return {
            layoutStyle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsMain.scss" />
