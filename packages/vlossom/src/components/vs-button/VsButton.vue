<template>
    <button
        type="button"
        :class="['vs-button', 'vs-inline-gap', colorSchemeClass, classObj, stateClasses]"
        :style="computedStyleSet"
        :disabled="disabled"
        :aria-label="loading ? 'loading' : undefined"
    >
        <span class="content">
            <slot />
        </span>

        <span class="loading-icon">
            <vs-icon class="rotate" icon="rotateRight" :size="dense ? 15 : 20" />
        </span>
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStateClass, useStyleSet } from '@/composables';
import { VsComponent, UIState, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';

import type { VsButtonStyleSet } from './types';

const name = VsComponent.VsButton;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsButtonStyleSet> },
        dense: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        large: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
        responsive: { type: Boolean, default: false },
        state: { type: String as PropType<UIState>, default: UIState.Idle },
    },
    setup(props) {
        const { colorScheme, styleSet, dense, large, loading, responsive, outline, primary, state } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { stateClasses } = useStateClass(state);

        const { computedStyleSet } = useStyleSet<VsButtonStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            dense: dense.value,
            large: large.value,
            loading: loading.value,
            outline: outline.value,
            primary: primary.value,
            responsive: responsive.value,
        }));

        return {
            colorSchemeClass,
            computedStyleSet,
            classObj,
            stateClasses,
        };
    },
});
</script>

<style lang="scss" src="./VsButton.scss" />
