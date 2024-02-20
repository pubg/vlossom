<template>
    <vs-wrapper class="vs-accordion" :width="width" :grid="grid">
        <details :class="`vs-${computedColorScheme}`" :style="computedStyleSet" :open="open" @toggle.stop="onToggle">
            <summary>
                <slot name="title" />
            </summary>
            <div class="accordion-content">
                <slot />
            </div>
        </details>
    </vs-wrapper>
</template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsAccordionStyleSet } from './types';

const name = VsComponent.VsAccordion;
export default defineComponent({
    name,
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: {
            type: [String, Object] as PropType<string | VsAccordionStyleSet>,
            default: '',
        },
        // v-model
        open: { type: Boolean, default: false },
    },
    emits: ['update:open', 'toggle'],
    setup(props, { emit }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);
        const { computedStyleSet } = useStyleSet<VsAccordionStyleSet>(name, styleSet);

        function onToggle(event: Event) {
            const { open } = event.target as HTMLDetailsElement;
            emit('update:open', open);
            emit('toggle', open);
        }

        return {
            computedColorScheme,
            computedStyleSet,
            onToggle,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsAccordion.scss" />
