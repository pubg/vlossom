<template>
    <div :class="['vs-bar-node', `vs-${colorScheme}`, { ...classObj }]" :style="computedStyle">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, type PropType } from 'vue';
import type { Align, ColorScheme, CssPosition } from '@/declaration';

export default defineComponent({
    props: {
        colorScheme: { type: String as PropType<'default' | ColorScheme>, required: true },
        styleSet: { type: Object as PropType<{ [key: string]: any }>, default: () => ({}) },
        height: { type: String, default: '' },
        position: { type: String as PropType<CssPosition>, default: '' },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<Align>, default: '' },
    },
    setup(props) {
        const { styleSet, height, position, primary, verticalAlign } = toRefs(props);

        const convertedStyleSet = computed(() => {
            return Object.entries(styleSet.value).reduce(
                (acc, [key, value]) => {
                    const propName = key.split('-').pop();
                    acc[`--vs-bar-node-${propName}`] = value;
                    return acc;
                },
                {} as { [key: string]: any },
            );
        });

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        const computedStyle = computed(() => {
            const style = { ...convertedStyleSet.value };
            if (height.value) {
                style['--vs-bar-node-height'] = height.value;
            }
            if (position.value) {
                style['--vs-bar-node-position'] = position.value;
            }

            if (verticalAlign.value === 'start') {
                style.alignItems = 'flex-start';
            } else if (verticalAlign.value === 'end') {
                style.alignItems = 'flex-end';
            } else {
                style.alignItems = 'center';
            }

            return style;
        });

        return {
            computedStyle,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsBarNode.scss" />
