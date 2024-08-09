<template>
    <vs-responsive
        :class="['vs-label-value', colorSchemeClass, classObj]"
        :style="computedStyleSet"
        :width="width"
        :grid="grid"
    >
        <div v-if="$slots['label']" class="vs-cell vs-label" :style="align">
            <slot name="label" />
        </div>
        <div v-if="$slots['value']" class="vs-cell vs-value" :style="align">
            <slot name="value" />
        </div>
        <div v-if="$slots['actions']" class="vs-cell vs-actions" :style="align">
            <slot name="actions" />
        </div>
    </vs-responsive>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
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
        verticalAlign: { type: String as PropType<'top' | 'middle' | 'bottom'>, default: 'middle' },
    },
    setup(props) {
        const { colorScheme, styleSet, dense, inline, primary, verticalAlign } = toRefs(props);

        const { colorSchemeClass } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsLabelValueStyleSet>(name, styleSet);

        const align = computed(() => {
            if (verticalAlign.value === 'top') {
                return { alignItems: 'flex-start' };
            } else if (verticalAlign.value === 'bottom') {
                return { alignItems: 'flex-end' };
            }
            return { alignItems: 'center' };
        });

        const classObj = computed(() => ({
            'vs-inline': inline.value,
            'vs-inline-gap': inline.value,
            'vs-dense': dense.value,
            'vs-primary': primary.value,
        }));

        return {
            align,
            classObj,
            colorSchemeClass,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" src="./VsLabelValue.scss" />
