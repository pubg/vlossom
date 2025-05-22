<template>
    <vs-responsive
        :class="['vs-label-value', colorSchemeClass, classObj]"
        :style="computedStyleSet"
        :width="width"
        :grid="grid"
    >
        <div v-if="$slots['label']" class="vs-cell vs-label">
            <slot name="label" />
        </div>
        <div v-if="$slots['value']" class="vs-cell vs-value">
            <slot name="value" />
        </div>
        <div v-if="$slots['actions']" class="vs-cell vs-actions">
            <slot name="actions" />
        </div>
    </vs-responsive>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { getResponsiveProps } from '@/models';
import { VsComponent, type ColorScheme } from '@/declaration';
import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';

import type { VsLabelValueStyleSet } from './types';

const name = VsComponent.VsLabelValue;
export default defineComponent({
    name,
    components: { VsResponsive },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsLabelValueStyleSet> },
        dense: { type: Boolean, default: false },
        inline: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
    },
    setup(props) {
        const { colorScheme, styleSet, dense, inline, primary } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsLabelValueStyleSet>(name, styleSet);

        const classObj = computed(() => ({
            'vs-inline': inline.value,
            'vs-inline-gap': inline.value,
            'vs-dense': dense.value,
            'vs-primary': primary.value,
        }));

        return {
            classObj,
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" src="./VsLabelValue.scss" />
