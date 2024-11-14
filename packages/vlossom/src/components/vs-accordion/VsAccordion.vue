<template>
    <vs-responsive class="vs-accordion" :width="width" :grid="grid">
        <details
            :class="['vs-accordion-details', colorSchemeClass]"
            :style="computedStyleSet"
            :open="isOpen"
            @toggle.stop="onToggle"
        >
            <summary class="vs-accordion-summary">
                <slot name="title" />
            </summary>
            <div class="vs-accordion-content">
                <slot />
            </div>
        </details>
    </vs-responsive>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, toRefs, watch } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { getResponsiveProps } from '@/models';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

import type { VsAccordionStyleSet } from './types';

const name = VsComponent.VsAccordion;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsAccordionStyleSet> },
        open: { type: Boolean, default: false },
        // v-model
        modelValue: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'toggle'],
    setup(props, { emit }) {
        const { colorScheme, styleSet, open, modelValue } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsAccordionStyleSet>(name, styleSet);

        const isOpen = ref(open.value || modelValue.value);

        function onToggle(event: Event) {
            const element = event.target as HTMLDetailsElement;
            isOpen.value = element.open;
        }

        watch(modelValue, (o) => {
            isOpen.value = o;
        });

        watch(isOpen, (o) => {
            emit('update:modelValue', o);
            emit('toggle', o);
        });

        return {
            isOpen,
            colorSchemeClass,
            computedStyleSet,
            onToggle,
        };
    },
});
</script>

<style lang="scss" src="./VsAccordion.scss" />
