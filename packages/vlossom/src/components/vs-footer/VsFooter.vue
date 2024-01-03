<template>
    <footer :class="['vs-footer', `vs-${computedColorScheme}`]" :style="customProperties">
        <slot />
    </footer>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent, TextAlign } from '@/declaration/types';

interface FooterStyleSet {
    backgroundColor: string;
    color: string;
    height: string;
    padding: string;
    textAlign: TextAlign;
}

export type VsFooterStyleSet = Partial<FooterStyleSet>;

const name = VsComponent.VsFooter;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsFooterStyleSet>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsFooterStyleSet>(name, styleSet);

        return {
            computedColorScheme,
            customProperties,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsFooter.scss" />
