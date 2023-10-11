<template>
    <button type="button" :class="['vs-button', { ...classObj }]" :disabled="disabled">
        <span class="content">
            <slot />
        </span>
    </button>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';

interface ButtonStyleSet {
    backgroundColor: string;
    borderColor: string;
    borderRadius: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    maxHeight: string;
    padding: string;
}

export type VsButtonStyleSet = Partial<ButtonStyleSet>;

const VsButton = defineComponent({
    name: 'vs-button',
    props: {
        colorScheme: { type: String, default: 'indigo' },
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
        const { dense, large, loading, mobileFull, outline } = toRefs(props);

        const classObj = computed(() => ({
            dense: dense.value,
            large: large.value,
            loading: loading.value,
            'mobile-full': mobileFull.value,
            outline: outline.value,
        }));

        return {
            classObj,
        };
    },
});

export default VsButton;
export type VsButtonInstance = InstanceType<typeof VsButton>;
</script>

<style lang="scss" scoped src="./VsButton.scss"></style>
