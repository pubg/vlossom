<template>
    <div class="vs-icon" :style="computedSize" v-html="iconSvgs[icon]" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { iconSvgs } from './icons';

export default defineComponent({
    props: {
        icon: {
            type: String as PropType<keyof typeof iconSvgs>,
            required: true,
        },
        size: {
            type: [Number, String],
            default: 0, // 0 means inherit from the parent
        },
    },
    setup(props) {
        const { size } = toRefs(props);

        const computedSize = computed(() => {
            if (!size.value) {
                return {};
            }

            const iconSize = isNaN(Number(size.value)) ? size.value : `${size.value}px`;
            return {
                width: iconSize,
                height: iconSize,
            };
        });

        return {
            iconSvgs,
            computedSize,
        };
    },
});
</script>

<style lang="scss">
.vs-icon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    width: 1rem;
    height: 1rem;

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
