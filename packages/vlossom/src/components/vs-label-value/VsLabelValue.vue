<template>
    <vs-responsive :width="width" :grid="grid">
        <div :class="['vs-label-value', colorSchemeClass, classObj]" :style="computedStyleSet">
            <div v-if="$slots['label']" class="vs-cell label" :style="align">
                <slot name="label" />
            </div>
            <div v-if="$slots['value']" class="vs-cell value" :style="align">
                <slot name="value" />
            </div>
            <div v-if="$slots['actions']" class="vs-cell actions" :style="align">
                <slot name="actions" />
            </div>
        </div>
    </vs-responsive>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { getResponsiveProps, useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsLabelValueStyleSet } from './types';

const name = VsComponent.VsLabelValue;

export default defineComponent({
    name,
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsLabelValueStyleSet> },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<'top' | 'middle' | 'bottom'>, default: 'middle' },
    },
    setup(props) {
        const { colorScheme, styleSet, primary, verticalAlign } = toRefs(props);

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
            primary: primary.value,
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

<style lang="scss" scoped src="./VsLabelValue.scss" />
