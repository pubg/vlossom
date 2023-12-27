<template>
    <div :class="['vs-label-value', `vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties">
        <div v-if="hasLabel" class="cell label">
            <slot name="label" />
        </div>
        <div v-if="hasValue" class="cell value">
            <slot name="value" />
        </div>
        <div v-if="hasActions" class="cell actions">
            <slot name="actions" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';

interface LabelValueStyleSet {
    backgroundColor: string;
    borderRadius: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    labelWidth: string;
    lineHeight: string;
    padding: string;
    width: string;
}

export type VsLabelValueStyleSet = Partial<LabelValueStyleSet>;

const name = VsComponent.VsLabelValue;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsLabelValueStyleSet>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet, primary } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsLabelValueStyleSet>(name, styleSet);

        const hasLabel = computed((): boolean => !!slots['label']);
        const hasValue = computed((): boolean => !!slots['value']);
        const hasActions = computed((): boolean => !!slots['actions']);

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            classObj,
            customProperties,
            hasLabel,
            hasValue,
            hasActions,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsLabelValue.scss" />
