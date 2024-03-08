<template>
    <draggable tag="tbody" v-model="computedItems" item-key="id" handle=".handle" :disabled="!draggable || loading">
        <template #item="{ element, index }">
            <vs-table-body-row
                :item="element"
                :headers="headers"
                :draggable="draggable"
                :loading="loading"
                :row-index="index"
                :tr-style="trStyle"
                @click="emitRowClick(element, index)"
            >
                <template v-for="(_, name) in $slots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData || {}" />
                </template>
            </vs-table-body-row>
        </template>
    </draggable>
    <tbody v-if="loading && computedItems.length === 0">
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
    <tbody v-if="!loading && computedItems.length === 0">
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
import { VsIcon } from '@/icons';
import { stringUtil } from '@/utils/string';

import type { TableHeader, TableItem } from './types';

export default defineComponent({
    name: 'vs-table-body',
    props: {
        draggable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        loading: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    components: {
        draggable,
        VsTableBodyRow,
        VsIcon,
    },
    emits: ['sort', 'rowClick', 'update:tableItems'],
    setup(props, { emit }) {
        const { items } = toRefs(props);

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

        function emitUpdateTableItems(itemArr: TableItem[]) {
            const values = itemArr.map((i) => i.data);
            emit('update:tableItems', values);
        }

        function emitRowClick(rowItem: any, rowIndex: number) {
            emit('rowClick', rowItem, rowIndex);
        }

        const computedItems: WritableComputedRef<TableItem[]> = computed({
            get(): TableItem[] {
                return innerTableItems.value;
            },
            set(itemArr: TableItem[]) {
                innerItems.value = itemArr.map((i) => i.data);
                emitUpdateTableItems(itemArr);
            },
        });

        // for initial skeleton loading
        const dummyTableItems = new Array(4).fill({}).map((item) => {
            return { id: stringUtil.createID(), data: item };
        });

        return {
            computedItems,
            dummyTableItems,
            emitRowClick,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
