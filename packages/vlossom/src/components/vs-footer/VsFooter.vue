<template>
    <div :class="['vs-footer', colorSchemeClass, { 'vs-primary': primary }]" :style="computedStyleSet">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, watch, inject, type PropType, getCurrentInstance } from 'vue';
import { useColorScheme, useLayout, useStyleSet } from '@/composables';
import { VS_LAYOUT, VsComponent } from '@/declaration';
import { utils } from '@/utils';

import type { ColorScheme } from '@/declaration';
import type { VsFooterStyleSet } from './types';

const name = VsComponent.VsFooter;
export default defineComponent({
    name,
    props: {
        absolute: { type: Boolean, default: false },
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFooterStyleSet> },
        fixed: { type: Boolean, default: false },
        height: { type: String, default: 'auto' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, fixed, height, absolute } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const computedPosition = computed(() => (absolute.value ? 'absolute' : fixed.value ? 'fixed' : 'relative'));
        const additionalStyles = computed(() =>
            utils.object.shake({
                height: height.value,
                position: computedPosition.value === 'relative' ? undefined : computedPosition.value,
            }),
        );
        const { computedStyleSet } = useStyleSet<VsFooterStyleSet>(name, styleSet, additionalStyles);

        // only for vs-layout children
        const isLayoutChild = getCurrentInstance()?.parent?.type.name === VsComponent.VsLayout;
        if (isLayoutChild) {
            const { getDefaultLayoutProvide } = useLayout();
            const { setFooterLayout } = inject(VS_LAYOUT, getDefaultLayoutProvide());

            watch(
                [absolute, fixed, height],
                () => {
                    setFooterLayout({ position: computedPosition.value, height: height.value });
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

<style lang="scss" src="./VsFooter.scss" />
