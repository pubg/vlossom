<template>
    <div :class="['vs-chip', 'vs-inline-gap', `vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet">
        <span v-if="hasIcon" class="vs-chip-icon vs-chip-prepend-icon">
            <slot name="icon" />
        </span>

        <div class="vs-chip-content">
            <slot />
        </div>

        <button
            v-if="closable"
            type="button"
            :class="['vs-chip-icon', 'vs-chip-close', { primary }]"
            aria-label="close"
            @click.stop="$emit('close')"
        >
            <vs-icon class="close-icon" icon="close" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs, useAttrs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsIcon } from '@/icons';

import type { VsChipStyleSet } from './types';

interface SetupContextAttrs {
    onClick?: () => void;
}

const name = VsComponent.VsChip;
export default defineComponent({
    name,
    components: { VsIcon },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsChipStyleSet> },
        closable: { type: Boolean, default: false },
        noRound: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
    },
    emits: ['close'],
    setup(props, { slots }) {
        const { colorScheme, noRound, primary, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsChipStyleSet>(name, styleSet);

        const hasIcon = computed((): boolean => !!slots['icon']);

        const attrs: SetupContextAttrs = useAttrs();

        const classObj = computed(() => ({
            noRound: noRound.value,
            primary: primary.value,
            clickable: attrs.onClick ?? false,
        }));

        return {
            hasIcon,
            computedColorScheme,
            computedStyleSet,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsChip.scss" />
