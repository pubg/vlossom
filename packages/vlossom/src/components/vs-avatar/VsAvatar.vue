<template>
    <div :class="['vs-avatar', colorSchemeClass]" :style="computedStyleSet">
        <slot />
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { VsAvatarStyleSet } from './types';

const name = VsComponent.VsAvatar;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsAvatarStyleSet> },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsAvatarStyleSet>(name, styleSet);

        return {
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" src="./VsAvatar.scss" scoped />
