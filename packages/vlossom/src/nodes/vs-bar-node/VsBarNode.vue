<template>
    <div :class="['vs-bar-node', colorSchemeClass, { 'vs-primary': primary }]" :style="computedStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType } from 'vue';
import { VsNode, type ColorScheme, type CssPosition } from '@/declaration';
import { useColorScheme } from '@/composables';
import { VsBarNodeStyleSet } from './types';

const name = VsNode.VsBarNode;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsBarNodeStyleSet> },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const computedStyle = computed(() => {
            const convertedStyle = Object.entries(styleSet.value || {}).reduce((acc, [key, value]) => {
                const propName = key.split('-').pop();
                acc[`--vs-bar-node-${propName}`] = value;
                return acc;
            }, {} as { [key: string]: any });

            if (height.value) {
                convertedStyle['--vs-bar-node-height'] = height.value;
            }
            if (position.value) {
                convertedStyle['--vs-bar-node-position'] = position.value;
            }

            return convertedStyle;
        });

        return {
            colorSchemeClass,
            computedStyle,
        };
    },
});
</script>

<style lang="scss" src="./VsBarNode.scss" />
