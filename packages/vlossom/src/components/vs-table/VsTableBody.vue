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
                :selectable="selectable"
                :expanded="isExpanded(element.id)"
                :selected="isSelected(element.id)"
                :rows="rows"
                :loading="loading"
                :row-index="index"
                :tr-style="trStyle"
                @click="emitRowClick(element, index)"
                @toggleExpand="toggleExpand"
            >
                <template #check>
                    <vs-check-node
                        :id="element.id"
                        type="checkbox"
                        :color-scheme="colorScheme"
                        :checked="isSelected(element.id)"
                        aria-label="select"
                        @toggle="(e) => toggleSelect(e, element.id)"
                    />
                </template>
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
import { useTableSelect } from './composables/useTableSelect';
import { VsIcon } from '@/icons';
import { VsCheckNode } from '@/nodes';
import { utils } from '@/utils';

import type { ColorScheme } from '@/declaration';
import type { TableHeader, TableItem, TableFilter, SortType, TableRow } from './types';
import { useTablePagination } from './composables/useTablePagination';

export default defineComponent({
    name: 'vs-table-body',
    components: {
        draggable,
        VsTableBodyRow,
        VsIcon,
        VsCheckNode,
    },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        draggable: { type: Boolean, default: false },
        expandedIds: { type: Array as PropType<string[]>, default: () => [] },
        filter: {
            type: Object as PropType<TableFilter>,
            default: null,
        },
        hasExpand: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        innerPage: { type: Number, default: -1 },
        innerItemsPerPage: { type: Number, default: -1 },
        loading: { type: Boolean, default: false },
        pagination: { type: Boolean, default: false },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
        selectable: { type: Boolean, default: false },
        selectedItems: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
        },
        sortTypes: {
            type: Object as PropType<{ [key: string]: SortType }>,
            default: () => ({}),
        },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
        totalLength: { type: Number, default: 0 },
        // v-model
        isSelectedAll: { type: Boolean, default: false },
        totalItemsLength: { type: Number, default: 0 },
    },
    emits: [
        'rowClick',
        'toggleExpand',
        'change:selectedItems',
        'change:totalItems',
        'change:pagedItems',
        'update:isSelectedAll',
        'update:totalItemsLength',
    ],
    expose: ['expand'],
    setup(props, ctx) {
        const {
            headers,
            items,
            search,
            searchableKeys,
            filter,
            sortTypes,
            hasExpand,
            isSelectedAll,
            rows,
            selectable,
            selectedItems,
            pagination,
            innerPage,
            innerItemsPerPage,
            totalLength,
        } = toRefs(props);

        const innerItems: Ref<any[]> = ref([]);
        const innerTableItems: ComputedRef<TableItem[]> = computed(() => {
            const itemArr = innerItems.value || [];
            return itemArr.map((item: any) => {
                return { id: utils.string.createID(), data: item };
            });
        });

        const { getSearchedTableItems } = useTableSearch(headers, searchableKeys);
        const { getFilteredTableItems } = useTableFilter();
        const { getSortedTableItems } = useTableSort();
        const { getPagedTableItems } = useTablePagination();

        function getResultTableItems() {
            const searched = getSearchedTableItems(innerTableItems.value, search);
            const filtered = getFilteredTableItems(searched, filter);
            const sorted = getSortedTableItems(filtered, sortTypes);
            return sorted;
        }

        const computedTableItems: WritableComputedRef<TableItem[]> = computed({
            get(): TableItem[] {
                const resultTableItems = getResultTableItems();
                const pagedTableItems = getPagedTableItems(
                    resultTableItems,
                    pagination,
                    innerPage,
                    innerItemsPerPage,
                    totalLength,
                );
                ctx.emit('update:totalItemsLength', resultTableItems.length);
                const resultItems = resultTableItems.map((i) => i.data);
                const pagedItems = pagination.value ? pagedTableItems.map((i) => i.data) : resultItems;
                ctx.emit('change:totalItems', resultItems);
                ctx.emit('change:pagedItems', pagedItems);
                return pagedTableItems;
            },
            set(itemArr: TableItem[]) {
                innerItems.value = itemArr.map((i) => i.data);
                ctx.emit('change:totalItems', innerItems.value);
            },
        });

        watch(
            items,
            (newItems: any[]) => {
                innerItems.value = newItems || [];
            },
            { immediate: true },
        );

        const { isSelected, toggleSelect } = useTableSelect(
            selectable,
            selectedItems,
            isSelectedAll,
            innerTableItems,
            computedTableItems,
            rows,
            ctx,
        );

        const { isExpanded, toggleExpand } = useTableExpand(hasExpand);

        function expand(index: number) {
            const target = computedTableItems.value[index];
            if (!target) {
                return;
            }
            toggleExpand(target.id);
        }

        function emitRowClick(rowItem: any, rowIndex: number) {
            ctx.emit('rowClick', rowItem, rowIndex);
        }

        // for initial skeleton loading
        const dummyTableItems = new Array(4).fill({}).map((item) => {
            return { id: utils.string.createID(), data: item };
        });

        return {
            computedTableItems,
            dummyTableItems,
            utils,
            isSelected,
            toggleSelect,
            isExpanded,
            toggleExpand,
            emitRowClick,
            // expose
            expand,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
