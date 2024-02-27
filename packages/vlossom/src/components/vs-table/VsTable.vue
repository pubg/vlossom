<template> </template>

<script lang="ts">
import { PropType, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import type { VsTableStyleSet } from './types';

const name = VsComponent.VsTable;

export default defineComponent({
    name,
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTableStyleSet>, default: '' },
    },
    setup(props) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTableStyleSet>(name, styleSet);

        return {
            computedColorScheme,
            computedStyleSet,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTable.scss" />
