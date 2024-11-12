<template>
    <div
        :class="['vs-header', colorSchemeClass, { 'vs-primary': primary, 'vs-fixed': fixed }]"
        :style="computedStyleSet"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, watch, inject, type PropType, getCurrentInstance } from 'vue';
import { useColorScheme, useLayout, useStyleSet } from '@/composables';
import { VS_LAYOUT, VsComponent } from '@/declaration';

import type { ColorScheme } from '@/declaration';
import type { VsHeaderStyleSet } from './types';

const name = VsComponent.VsHeader;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsHeaderStyleSet> },
        fixed: { type: Boolean, default: false },
        height: { type: String, default: 'auto' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, fixed, height } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const additionalStyles = computed(() => ({ height: height.value }));
        const { computedStyleSet } = useStyleSet<VsHeaderStyleSet>(name, styleSet, additionalStyles);

        // only for vs-layout children
        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
            const { getDefaultLayoutProvide } = useLayout();
            const { setHeaderLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

            watch(
                [fixed, height],
                ([newFixed, newHeight]) => {
                    setHeaderLayout({ position: newFixed ? 'fixed' : 'absolute', height: newHeight });
                },
                { immediate: true },
            );
        }

        return {
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" src="./VsHeader.scss" />
