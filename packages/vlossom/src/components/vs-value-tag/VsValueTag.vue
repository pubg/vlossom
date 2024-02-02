<template>
    <div :class="['vs-value-tag', `vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet">
        <div v-if="hasLabel" class="label">
            <slot name="label" />
        </div>
        <div class="value">
            <slot name="value" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsValueTagStyleSet } from './types';

const name = VsComponent.VsValueTag;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsValueTagStyleSet>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet, primary } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsValueTagStyleSet>(name, styleSet);

        const hasLabel = computed((): boolean => !!slots['label']);

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            computedStyleSet,
            hasLabel,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsValueTag.scss" />
