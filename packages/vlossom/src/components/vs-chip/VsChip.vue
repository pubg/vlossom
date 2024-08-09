<template>
    <div :class="['vs-chip', 'vs-inline-gap', colorSchemeClass, classObj]" :style="computedStyleSet">
        <span v-if="hasIcon" class="vs-icon-container vs-chip-icon">
            <slot name="icon" />
        </span>

        <span class="vs-chip-content">
            <slot />
        </span>

        <button
            v-if="closable"
            type="button"
            class="vs-icon-container vs-chip-close-button"
            aria-label="close"
            tabindex="-1"
            @click.stop="$emit('close')"
        >
            <vs-icon icon="close" size="14px" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';

import type { VsChipStyleSet } from './types';

const name = VsComponent.VsChip;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsChipStyleSet> },
        closable: { type: Boolean, default: false },
        dense: { type: Boolean, default: false },
        noRound: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
    },
    emits: ['close'],
    setup(props, { slots }) {
        const { colorScheme, dense, noRound, primary, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsChipStyleSet>(name, styleSet);

        const hasIcon = computed((): boolean => !!slots['icon']);

        const classObj = computed(() => ({
            'vs-dense': dense.value,
            'vs-no-round': noRound.value,
            'vs-primary': primary.value,
        }));

        return {
            hasIcon,
            colorSchemeClass,
            computedStyleSet,
            classObj,
        };
    },
});
</script>

<style lang="scss" src="./VsChip.scss" />
