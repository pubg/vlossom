<template>
    <vue-draggable tag="tbody" v-model="computedItems" item-key="id" :disabled="!canDrag || loading">
        <template #item="{ element, index }">
            <VsTableBodyRow
                :item="element"
                :loading="loading"
                :row-index="index"
                :draggable="canDrag"
                :headers="headers"
                @click="emitRowClick(element, index)"
            >
                <template v-for="(_, name) in itemSlots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData || {}" />
                </template>
            </VsTableBodyRow>
        </template>
    </vue-draggable>
</template>

<script lang="ts">
import VueDraggable from 'vuedraggable/src/vuedraggable';
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, toRefs, watch, WritableComputedRef } from 'vue';
import type { TableHeader, TableItem } from './types';

import VsTableBodyRow from './VsTableBodyRow.vue';
import { stringUtil } from '@/utils/string';

export default defineComponent({
    props: {
        draggable: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        items: { type: Array as PropType<any[]>, default: () => [] as any[] },
        pagination: { type: Boolean, default: false },
    },
    components: {
        VueDraggable,
        VsTableBodyRow,
    },
    emits: ['sort', 'rowClick', 'update:tableItems'],
    setup(props, { emit, slots }) {
        const { items, draggable, pagination } = toRefs(props);

        const itemSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('item-') || slotName === 'expand') {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });

        const innerItems: Ref<any[]> = ref([]);
        const innerTableItems: ComputedRef<TableItem[]> = computed(() => {
            const itemArr = innerItems.value || [];
            return itemArr.map((item: any) => {
                return { id: stringUtil.createID(), data: item };
            });
        });

        const canDrag = computed(() => {
            return draggable.value && !pagination.value;
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

        return {
            itemSlots,
            computedItems,
            canDrag,
            emitRowClick,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
