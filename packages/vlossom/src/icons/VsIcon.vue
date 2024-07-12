<template>
    <i class="vs-icon" :style="computedSize" v-html="iconSvgs[icon]" />
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { iconSvgs } from './icons';
import { utils } from '@/utils';

export default defineComponent({
    props: {
        icon: { type: String as PropType<keyof typeof iconSvgs>, required: true },
        size: { type: [Number, String], default: 0 },
    },
    setup(props) {
        const { size } = toRefs(props);

        const computedSize = computed(() => {
            if (!size.value) {
                return {};
            }

            const iconSize = utils.string.convertToStringSize(size.value);
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
    width: var(--vs-font-size);
    height: var(--vs-font-size);

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>
