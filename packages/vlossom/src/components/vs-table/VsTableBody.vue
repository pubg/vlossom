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
                :expanded-ids="expandedIds"
                :expandable="hasExpand"
                :rows="rows"
                :loading="loading"
                :row-index="index"
                :tr-style="trStyle"
                @click="emitRowClick(element, index)"
                @toggleExpand="onToggleExpand"
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
import useTableSearch from './composables/useTableSearch';
import { VsIcon } from '@/icons';
import { stringUtil } from '@/utils/string';

import type { TableHeader, TableItem, TableRow } from './types';

export default defineComponent({
    name: 'vs-table-body',
    components: {
        draggable,
        VsTableBodyRow,
        VsIcon,
    },
    props: {
        draggable: { type: Boolean, default: false },
        expandedIds: { type: Array as PropType<string[]>, default: () => [] },
        hasExpand: { type: Boolean, default: false },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        loading: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
    },
    emits: ['sort', 'rowClick', 'toggleExpand', 'update:tableItems'],
    setup(props, { emit }) {
        const { headers, items, search, searchableKeys } = toRefs(props);

        const innerItems: Ref<any[]> = ref([]);
        const innerTableItems: ComputedRef<TableItem[]> = computed(() => {
            const itemArr = innerItems.value || [];
            return itemArr.map((item: any) => {
                return { id: stringUtil.createID(), data: item };
            });
        });

        watch(
            items,
            (newItems: any[]) => {
                innerItems.value = newItems || [];
            },
            { immediate: true },
        );

        const { getSearchedItems } = useTableSearch(headers, searchableKeys);

        function getResultItems() {
            const searched = getSearchedItems(innerTableItems, search);
            // [TODO] filter, sort
            return searched;
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

        // for initial skeleton loading
        const dummyTableItems = new Array(4).fill({}).map((item) => {
            return { id: stringUtil.createID(), data: item };
        });

        function emitRowClick(rowItem: any, rowIndex: number) {
            emit('rowClick', rowItem, rowIndex);
        }

        function onToggleExpand(id: string) {
            emit('toggleExpand', id);
        }

        return {
            computedTableItems,
            dummyTableItems,
            emitRowClick,
            onToggleExpand,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
