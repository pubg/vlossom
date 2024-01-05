<template>
    <footer :class="['vs-footer', `vs-${computedColorScheme}`, { ...classObj }]" :style="[customProperties, align]">
        <div class="vs-footer-content">
            <slot />
        </div>
    </footer>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs, computed } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent, TextAlign, VerticalAlign } from '@/declaration/types';

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
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<VerticalAlign>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet, primary, verticalAlign } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsFooterStyleSet>(name, styleSet);

        const align = computed(() => {
            if (verticalAlign.value === 'top') {
                return {
                    display: 'flex',
                    alignItems: 'flex-start',
                };
            } else if (verticalAlign.value === 'bottom') {
                return { display: 'flex', alignItems: 'flex-end' };
            }
            return {};
        });

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            customProperties,
            align,
            classObj,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsFooter.scss" />
