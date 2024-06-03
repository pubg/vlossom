<template>
    <component :is="tag" :class="['vs-container', { grid }]" :style="computedStyles">
        <slot />
    </component>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, toRefs } from 'vue';
import { VS_LAYOUT, VsComponent } from '@/declaration';
import { getGridProps, useLayout } from '@/composables';

const name = VsComponent.VsContainer;
export default defineComponent({
    name,
    props: {
        ...getGridProps(name),
        tag: { type: String, default: 'div' },
    },
    setup(props) {
        const { columnGap, grid, rowGap } = toRefs(props);

        const gridStyles = computed(() => {
            if (!grid.value) {
                return {};
            }

            return {
                rowGap: isNaN(Number(rowGap.value)) ? rowGap.value : `${rowGap.value}px`,
                columnGap: isNaN(Number(columnGap.value)) ? columnGap.value : `${columnGap.value}px`,
            };
        });

        // only for vs-layout children
        const { getDefaultLayoutProvide } = useLayout();
        const { header, footer } = inject(VS_LAYOUT, getDefaultLayoutProvide());

        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        const layoutStyles = computed(() => {
            if (!isLayoutChild) {
                return {};
            }

            const style: { [key: string]: string | number } = {};
            const needPadding = ['absolute', 'fixed'];

            const { position: headerPosition, height: headerHeight } = header.value;
            if (needPadding.includes(headerPosition)) {
                style.paddingTop = headerHeight;
            }

            const { position: footerPosition, height: footerHeight } = footer.value;
            if (needPadding.includes(footerPosition)) {
                style.paddingBottom = footerHeight;
            }

            return style;
        });

        const computedStyles = computed(() => {
            return { ...gridStyles.value, ...layoutStyles.value };
        });

        return {
            gridStyles,
            layoutStyles,
            computedStyles,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsContainer.scss" />
