<template>
    <div :class="['vs-table', `vs-${computedColorScheme}`]" :style="computedStyleSet">
        <div class="table-wrap">
            <table>
                <VsTableHeader :headers="headers">
                    <template v-for="(_, name) in headerSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </VsTableHeader>
                <VsTableBody :headers="headers" :items="items">
                    <template v-for="(_, name) in $slots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </VsTableBody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import VsTableHeader from './VsTableHeader.vue';
import VsTableBody from './VsTableBody.vue';

import type { VsTableStyleSet, TableHeader } from './types';

const name = VsComponent.VsTable;

export default defineComponent({
    name,
    components: {
        VsTableHeader,
        VsTableBody,
    },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTableStyleSet>, default: '' },
        headers: { type: Array as PropType<TableHeader[]> },
        loading: { type: Boolean, default: false },
        items: { type: Array as PropType<any[]>, default: () => [] as any[] },
        pagination: { type: Boolean, default: false },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTableStyleSet>(name, styleSet);

        const headerSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('header-')) {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });


        return {
            computedColorScheme,
            computedStyleSet,
            headerSlots,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTable.scss" />
