<template>
    <div :class="['vs-bar-node', barColorSchemeClass, { 'vs-primary': primary }]" :style="computedStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, ref, type PropType } from 'vue';
import { VsNode, type ColorScheme, type CssPosition } from '@/declaration';
import { useColorScheme } from '@/composables';

export default defineComponent({
    name: VsNode.VsBarNode,
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme> },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, height, position } = toRefs(props);

        const barColorSchemeClass = computed(() => {
            const propColorScheme = colorScheme.value === 'default' ? undefined : colorScheme.value;
            const { colorSchemeClass } = useColorScheme(VsNode.VsBarNode, ref(propColorScheme));
            return colorSchemeClass.value;
        });

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
            barColorSchemeClass,
            computedStyle,
        };
    },
});
</script>

<style lang="scss" src="./VsBarNode.scss" />
