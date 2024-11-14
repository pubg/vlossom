<template>
    <component :is="tag" :class="['vs-container', colorSchemeClass, { 'vs-grid': grid }]" :style="computedStyles">
        <slot />
    </component>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, PropType, toRefs } from 'vue';
import { ColorScheme, VS_LAYOUT, VsComponent } from '@/declaration';
import { useColorScheme, useLayout } from '@/composables';
import { getGridProps } from '@/models';
import { utils } from '@/utils';

const name = VsComponent.VsContainer;
export default defineComponent({
    name,
    props: {
        ...getGridProps(name),
        colorScheme: { type: String as PropType<ColorScheme> },
        tag: { type: String, default: 'div' },
    },
    setup(props) {
        const { colorScheme, columnGap, grid, rowGap } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const gridStyles = computed(() => {
            if (!grid.value) {
                return {};
            }

            return {
                rowGap: utils.string.convertToStringSize(rowGap.value),
                columnGap: utils.string.convertToStringSize(columnGap.value),
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
            colorSchemeClass,
            gridStyles,
            layoutStyles,
            computedStyles,
        };
    },
});
</script>

<style lang="scss" src="./VsContainer.scss" />
