<template>
    <div :class="['vs-table', `vs-${computedColorScheme}`, dense ? 'dense' : '']" :style="computedStyleSet">
        <div class="table-wrap">
            <table>
                <vs-table-header
                    :headers="headers"
                    :draggable="draggable"
                    :expandable="expandable"
                    :loading="loading"
                    :tr-style="trStyle"
                >
                    <template v-for="(_, name) in headerSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-header>
                <vs-table-body
                    :items="items"
                    :headers="headers"
                    :draggable="draggable"
                    :expanded-ids="expandedIds"
                    :expandable="expandable"
                    :rows="rows"
                    :loading="loading"
                    :search="search"
                    :searchable-keys="searchableKeys"
                    :tr-style="trStyle"
                >
                    <template v-for="(_, name) in itemSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-body>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, Ref, computed, defineComponent, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import useTableExpand from './composables/useTableExpand';

import VsTableHeader from './VsTableHeader.vue';
import VsTableBody from './VsTableBody.vue';

import type { VsTableStyleSet, TableHeader, TableRow } from './types';

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
        dense: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        loading: { type: Boolean, default: false },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
    },
    expose: ['expand'],
    setup(props, { slots }) {
        const { colorScheme, styleSet, draggable, headers, items } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTableStyleSet>(name, styleSet);

        const expandable = computed(() => !!slots['expand']);

        const headerSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('header-')) {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });

        const itemSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('item-') || slotName === 'expand') {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });

        const trStyle: ComputedRef<{ [key: string]: any }> = computed(() => {
            if (!headers.value) {
                return {};
            }
            const gridColumns = headers.value.map((h) => {
                return h.width || 'minmax(20rem, 1fr)';
            });

            if (draggable.value) {
                gridColumns.unshift('3rem');
            }

            if (expandable.value) {
                gridColumns.push('4.4rem');
            }

            return { gridTemplateColumns: gridColumns.join(' ') };
        });

        const expandedIds: Ref<string[]> = ref([]);
        const { toggleExpand } = useTableExpand(expandable, expandedIds);
        function expand(index: number) {
            const target = items.value[index]; // TODO: computedItems 생성
            if (!target) {
                return;
            }

            toggleExpand(target.id);
        }

        return {
            computedColorScheme,
            computedStyleSet,
            headerSlots,
            itemSlots,
            trStyle,
            expandable,
            expand,
            expandedIds,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTable.scss" />
