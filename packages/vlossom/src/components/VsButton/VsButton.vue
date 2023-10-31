<template>
    <button
        type="button"
        :class="['vs-button', `vs-${colorScheme}`, { ...classObj }]"
        :style="customProperties"
        :disabled="disabled"
    >
        <span class="content">
            <slot />
        </span>
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useCustomStyle } from '@/composables/useCustomStyle';
import { ColorScheme } from '@/declaration/types';

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

const VsButton = defineComponent({
    name: 'vs-button',
    props: {
        colorScheme: { type: String as PropType<ColorScheme>, default: 'indigo' },
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
        const { styleSet, dense, large, loading, mobileFull, outline, primary } = toRefs(props);

        const { customProperties } = useCustomStyle<VsButtonStyleSet>(styleSet, 'vs-button');

        const classObj = computed(() => ({
            dense: dense.value,
            large: large.value,
            loading: loading.value,
            'mobile-full': mobileFull.value,
            outline: outline.value,
            primary: primary.value,
        }));

        return {
            classObj,
            customProperties,
        };
    },
});

export default VsButton;
export type VsButtonInstance = InstanceType<typeof VsButton>;
</script>

<style lang="scss" scoped src="./VsButton.scss" />
