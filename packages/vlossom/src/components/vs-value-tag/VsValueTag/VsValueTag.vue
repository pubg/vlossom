<template>
    <div> </div>
</template>
<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useCustomStyle } from '@/composables';
import { ColorScheme, VsComponent } from '@/declaration/types';

interface ValueTagStyleSet {}

export type VsValueTagStyleSet = Partial<ValueTagStyleSet>;

const name = VsComponent.VsValueTag;

const VsValueTag = defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsValueTagStyleSet>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { customProperties } = useCustomStyle<VsValueTagStyleSet>(name, styleSet);

        return {
            computedColorScheme,
            customProperties,
        };
    },
});

export default VsValueTag;
export type VsValueTagInstance = InstanceType<typeof VsValueTag>;
</script>
<style lang="scss" scoped src="./VsValueTag.scss" />
