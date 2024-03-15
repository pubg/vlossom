<template>
    <draggable
        tag="tbody"
        v-model="computedTableItems"
        item-key="id"
        handle=".handle"
        :disabled="!draggable || loading"
    >
        <template #item="{ element, index }">
            <vs-table-body-row
                :item="element"
                :headers="headers"
                :draggable="draggable"
                :expandable="hasExpand"
                :expanded="isExpanded(element.id)"
                :rows="rows"
                :loading="loading"
                :row-index="index"
                :tr-style="trStyle"
                @click="emitRowClick(element, index)"
                @toggleExpand="toggleExpand"
            >
                <template v-for="(_, name) in $slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData || {}" />
                </template>
            </vs-table-body-row>
        </template>
    </draggable>
    <tbody v-if="loading && computedTableItems.length === 0">
        <vs-table-body-row
            v-for="(dummy, index) in dummyTableItems"
            :key="dummy.id"
            :item="dummy"
            :headers="headers"
            :draggable="draggable"
            :loading="loading"
            :row-index="index"
            :tr-style="trStyle"
        />
    </tbody>
    <tbody v-if="!loading && computedTableItems.length === 0">
        <slot name="empty">
            <div class="table-empty">
                <vs-icon size="6rem" icon="noData"></vs-icon>
                <p>NO DATA</p>
            </div>
        </slot>
    </tbody>
</template>

<script lang="ts">
import draggable from 'vuedraggable';
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, toRefs, watch, WritableComputedRef } from 'vue';
import VsTableBodyRow from './VsTableBodyRow.vue';
import { useTableSearch } from './composables/useTableSearch';
import { useTableFilter } from './composables/useTableFilter';
import { useTableSort } from './composables/useTableSort';
import { useTableExpand } from './composables/useTableExpand';
import { VsIcon } from '@/icons';
import { stringUtil } from '@/utils/string';

import type { TableHeader, TableItem, TableFilter, SortType, TableRow } from './types';

export default defineComponent({
    name: 'vs-table-body',
    components: {
        draggable,
        VsTableBodyRow,
        VsIcon,
    },
    props: {
        draggable: { type: Boolean, default: false },
        filter: {
            type: Object as PropType<TableFilter>,
            default: null,
        },
        expandedIds: { type: Array as PropType<string[]>, default: () => [] },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        hasExpand: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        loading: { type: Boolean, default: false },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
        sortTypes: {
            type: Object as PropType<{ [key: string]: SortType }>,
            default: () => ({}),
        },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    emits: ['sort', 'rowClick', 'toggleExpand', 'update:tableItems'],
    expose: ['expand'],
    setup(props, { emit }) {
        const { headers, items, search, searchableKeys, filter, sortTypes, hasExpand } = toRefs(props);

        const innerItems: Ref<any[]> = ref([]);
        const innerTableItems: ComputedRef<TableItem[]> = computed(() => {
            const itemArr = innerItems.value || [];
            return itemArr.map((item: any) => {
                return { id: stringUtil.createID(), data: item };
            });
        });

        const { getSearchedItems } = useTableSearch(headers, searchableKeys);
        const { getFilteredItems } = useTableFilter();
        const { getSortedItems } = useTableSort();

        function getResultItems() {
            const searched = getSearchedItems(innerTableItems, search);
            const filtered = getFilteredItems(searched, filter);
            const sorted = getSortedItems(filtered, sortTypes);
            return sorted;
        }

        const computedTableItems: WritableComputedRef<TableItem[]> = computed({
            get(): TableItem[] {
                return getResultItems();
            },
            set(itemArr: TableItem[]) {
                innerItems.value = itemArr.map((i) => i.data);
                emit('update:tableItems', innerItems.value);
            },
        });

        watch(
            items,
            (newItems: any[]) => {
                innerItems.value = newItems || [];
            },
            { immediate: true },
        );

        const { isExpanded, toggleExpand } = useTableExpand(hasExpand);

        function expand(index: number) {
            const target = computedTableItems.value[index];
            if (!target) {
                return;
            }
            toggleExpand(target.id);
        }

        // for initial skeleton loading
        const dummyTableItems = new Array(4).fill({}).map((item) => {
            return { id: stringUtil.createID(), data: item };
        });

        function emitRowClick(rowItem: any, rowIndex: number) {
            emit('rowClick', rowItem, rowIndex);
        }

        return {
            computedTableItems,
            dummyTableItems,
            emitRowClick,
            isExpanded,
            toggleExpand,
            // expose
            expand,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
