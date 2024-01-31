<template>
    <div :class="['vs-footer', `vs-${computedColorScheme}`, { ...classObj }]" :style="[computedStyle, alignStyle]">
        <div class="vs-footer-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType, type ComputedRef } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme, type Align } from '@/declaration';

import type { VsFooterStyleSet } from './types';

const name = VsComponent.VsFooter;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFooterStyleSet>, default: '' },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position, primary, verticalAlign } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsFooterStyleSet>(name, styleSet);

        const alignStyle: ComputedRef<{ alignItems: string }> = computed(() => {
            if (verticalAlign.value === 'start') {
                return { alignItems: 'flex-start' };
            } else if (verticalAlign.value === 'end') {
                return { alignItems: 'flex-end' };
            }
            return { alignItems: 'center' };
        });

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        const computedStyle = computed(() => {
            const style = { ...customProperties.value };
            if (height.value) {
                style['--vs-footer-height'] = height.value;
            }
            if (position.value) {
                style['--vs-footer-position'] = position.value;

                if (position.value === 'absolute' || position.value === 'fixed') {
                    style['--vs-footer-bottom'] = 0;
                    style['--vs-footer-left'] = 0;
                }
            }
            return style;
        });

        return {
            computedColorScheme,
            computedStyle,
            classObj,
            alignStyle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsFooter.scss" />
