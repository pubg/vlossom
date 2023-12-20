<template>
    <button
        type="button"
        :class="['vs-button', `vs-${computedColorScheme}`, { ...classObj }]"
        :style="customProperties"
        :disabled="disabled"
    >
        <span v-if="!loading" class="content">
            <slot />
        </span>

        <rotate-right v-if="loading" aria-label="loading" class="loading-icon" />
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';
import RotateRight from '@/assets/icons/rotate-right';

interface ButtonStyleSet {
    backgroundColor: string;
    borderRadius: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    maxHeight: string;
    outlineBorder: string;
    padding: string;
}

export type VsButtonStyleSet = Partial<ButtonStyleSet>;

const name = VsComponent.VsButton;

const VsButton = defineComponent({
    name,
    components: {
        RotateRight,
    },
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

        const { customProperties } = useCustomStyle<VsButtonStyleSet>(name, styleSet);

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
            customProperties,
            classObj,
        };
    },
});

export default VsButton;
export type VsButtonInstance = InstanceType<typeof VsButton>;
</script>

<style lang="scss" scoped src="./VsButton.scss" />
