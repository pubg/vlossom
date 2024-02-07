<template>
    <button
        type="button"
        :class="['vs-button', 'vs-inline-gap', `vs-${computedColorScheme}`, { ...classObj }]"
        :style="computedStyleSet"
        :disabled="disabled"
    >
        <span v-if="!loading" class="content">
            <slot />
        </span>

        <vs-icon v-if="loading" aria-label="loading" class="loading-icon" icon="rotateRight" :size="dense ? 20 : 24" />
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';

import type { VsButtonStyleSet } from './types';

const name = VsComponent.VsButton;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsButtonStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        large: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        mobileFull: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, dense, large, loading, mobileFull, outline, primary } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsButtonStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            dense: dense.value,
            large: large.value,
            loading: loading.value,
            'mobile-full': mobileFull.value,
            outline: outline.value,
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            computedStyleSet,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsButton.scss" />
