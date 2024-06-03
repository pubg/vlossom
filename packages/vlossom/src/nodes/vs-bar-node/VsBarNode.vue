<template>
    <div :class="['vs-bar-node', `vs-${colorScheme}`, { primary }]" :style="computedStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType } from 'vue';
import type { ColorScheme, CssPosition } from '@/declaration';

export default defineComponent({
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme>, required: true },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { styleSet, height, position } = toRefs(props);

        const computedStyle = computed(() => {
            const convertedStyle = Object.entries(styleSet.value || {}).reduce(
                (acc, [key, value]) => {
                    const propName = key.split('-').pop();
                    acc[`--vs-bar-node-${propName}`] = value;
                    return acc;
                },
                {} as { [key: string]: any },
            );

            if (height.value) {
                convertedStyle['--vs-bar-node-height'] = height.value;
            }
            if (position.value) {
                convertedStyle['--vs-bar-node-position'] = position.value;
            }

            return convertedStyle;
        });

        return {
            computedStyle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsBarNode.scss" />
