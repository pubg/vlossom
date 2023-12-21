<template>
    <div :class="['vs-value-tag', `vs-${computedColorScheme}`, { ...classObj }]" :style="customProperties">
        <div v-if="hasLabel" class="label">
            <slot name="label" />
        </div>
        <div class="value">
            <slot name="value" />
        </div>
    </div>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';

interface ValueTagStyleSet {
    backgroundColor: string;
    color: string;
    labelWidth: string;
}

export type VsValueTagStyleSet = Partial<ValueTagStyleSet>;

const name = VsComponent.VsValueTag;

const VsValueTag = defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsValueTagStyleSet>, default: '' },
        primary: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet, primary } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsValueTagStyleSet>(name, styleSet);

        const hasLabel = computed((): boolean => !!slots['label']);

        const classObj = computed(() => ({
            primary: primary.value,
        }));

        return {
            computedColorScheme,
            customProperties,
            hasLabel,
            classObj,
        };
    },
});

export default VsValueTag;
export type VsValueTagInstance = InstanceType<typeof VsValueTag>;
</script>
<style lang="scss" scoped src="./VsValueTag.scss" />
