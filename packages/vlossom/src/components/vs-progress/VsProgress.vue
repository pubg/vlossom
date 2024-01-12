<template>
    <progress
        :value="value"
        :max="max"
        :class="['vs-progress', `vs-${computedColorScheme}`, { ...classObj }]"
        :style="customProperties"
    />
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsProgressStyleSet } from './types';

const name = VsComponent.VsProgress;
export default defineComponent({
    name: name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsProgressStyleSet>, default: '' },
        max: { type: Number, default: 100 },
        value: { type: Number, default: 0 },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, primary } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsProgressStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            customProperties,
            classObj,
        };
    },
});
</script>

<style src="./VsProgress.scss" scoped />
