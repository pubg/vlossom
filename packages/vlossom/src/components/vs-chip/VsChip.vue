<template>
    <div :class="['vs-chip', `vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties">
        <span v-if="hasLeadingIcon" class="vs-chip-icon vs-chip-leading-icon">
            <slot name="leading-icon" />
        </span>

        <span class="vs-chip-content">
            <slot />
        </span>

        <button v-if="closable" type="button" :class="['vs-chip-icon', 'vs-chip-close', { primary }]" @click.stop="$emit('close')">
            <close aria-label="close" class="close-icon" />
        </button>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs, useAttrs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';
import Close from '@/assets/icons/close';

interface ChipStyleSet {
    backgroundColor: string;
    borderRadius: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    height: string;
    minHeight: string;
    outlineBorder: string;
    padding: string;
}

export type VsChipStyleSet = Partial<ChipStyleSet>;

interface SetupContextAttrs {
    onClick?: () => void;
}

const name = VsComponent.VsChip;

export default defineComponent({
    name,
    components: { Close },
    props: {
        closable: { type: Boolean, default: false },
        colorScheme: { type: String as PropType<ColorScheme> },
        noRound: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
        styleSet: { type: [String, Object] as PropType<string | VsChipStyleSet>, default: '' },
    },
    emits: ['close'],
    setup(props, { slots }) {
        const { colorScheme, noRound, primary, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsChipStyleSet>(name, styleSet);

        const hasLeadingIcon = computed((): boolean => !!slots['leading-icon']);

        const attrs: SetupContextAttrs = useAttrs();

        const classObj = computed(() => ({
            noRound: noRound.value,
            primary: primary.value,
            clickable: attrs.onClick ?? false,
        }));

        return {
            hasLeadingIcon,
            computedColorScheme,
            customProperties,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsChip.scss" />
