<template>
    <div :class="['vs-label-value', `vs-${computedColorScheme}`, { ...classObj }]" :style="computedStyleSet">
        <div v-if="hasLabel" class="cell label" :style="align">
            <slot name="label" />
        </div>
        <div v-if="hasValue" class="cell value" :style="align">
            <slot name="value" />
        </div>
        <div v-if="hasActions" class="cell actions" :style="align">
            <slot name="actions" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsLabelValueStyleSet } from './types';

const name = VsComponent.VsLabelValue;
export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsLabelValueStyleSet> },
        primary: { type: Boolean, default: false },
        verticalAlign: { type: String as PropType<'top' | 'middle' | 'bottom'>, default: '' },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet, primary, verticalAlign } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsLabelValueStyleSet>(name, styleSet);

        const hasLabel = computed((): boolean => !!slots['label']);
        const hasValue = computed((): boolean => !!slots['value']);
        const hasActions = computed((): boolean => !!slots['actions']);

        const align = computed(() => {
            if (verticalAlign.value === 'top') {
                return { alignItems: 'flex-start' };
            } else if (verticalAlign.value === 'bottom') {
                return { alignItems: 'flex-end' };
            }
            return {};
        });

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            align,
            computedColorScheme,
            classObj,
            computedStyleSet,
            hasLabel,
            hasValue,
            hasActions,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsLabelValue.scss" />
