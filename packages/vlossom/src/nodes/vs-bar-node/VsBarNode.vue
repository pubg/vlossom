<template>
    <div :class="['vs-bar-node', `vs-${colorScheme}`, { primary }]" :style="computedStyleSet">
        <div class="vs-bar-node-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType } from 'vue';
import type { Align, ColorScheme, CssPosition } from '@/declaration';

export default defineComponent({
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme>, required: true },
        styleSet: { type: Object as PropType<{ [key: string]: any }> },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { styleSet, height, position, verticalAlign } = toRefs(props);

        const computedStyleSet = computed(() => {
            const convertedStyleSet = Object.entries(styleSet.value || {}).reduce(
                (acc, [key, value]) => {
                    const propName = key.split('-').pop();
                    acc[`--vs-bar-node-${propName}`] = value;
                    return acc;
                },
                {} as { [key: string]: any },
            );

            if (height.value) {
                convertedStyleSet['--vs-bar-node-height'] = height.value;
            }
            if (position.value) {
                convertedStyleSet['--vs-bar-node-position'] = position.value;
            }

            if (verticalAlign.value === 'start') {
                convertedStyleSet.alignItems = 'flex-start';
            } else if (verticalAlign.value === 'end') {
                convertedStyleSet.alignItems = 'flex-end';
            } else {
                convertedStyleSet.alignItems = 'center';
            }

            return convertedStyleSet;
        });

        return {
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsBarNode.scss" />
