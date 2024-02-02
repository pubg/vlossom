<template>
    <div :class="['vs-header', `vs-${computedColorScheme}`, { ...classObj }]" :style="[computedStyle, alignStyle]">
        <div class="vs-header-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed, ComputedRef } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent, Align, CssPosition } from '@/declaration';

import type { VsHeaderStyleSet } from './types';

const name = VsComponent.VsHeader;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsHeaderStyleSet>, default: '' },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position, primary, verticalAlign } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsHeaderStyleSet>(name, styleSet);

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
                style['--vs-header-height'] = height.value;
            }
            if (position.value) {
                style['--vs-header-position'] = position.value;

                if (position.value === 'absolute' || position.value === 'fixed') {
                    style['--vs-header-top'] = 0;
                    style['--vs-header-left'] = 0;
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

<style lang="scss" scoped src="./VsHeader.scss" />
