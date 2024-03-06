<template>
    <vue-draggable tag="tbody" v-model="computedItems" item-key="id" handle=".handle" :disabled="!canDrag || loading">
        <template #item="{ element, index }">
            <VsTableBodyRow
                :item="element"
                :headers="headers"
                :draggable="canDrag"
                :loading="loading"
                :row-index="index"
                :tr-style="trStyle"
                @click="emitRowClick(element, index)"
            >
                <template v-for="(_, name) in itemSlots" #[name]="slotData">
                    <slot :name="name" v-bind="slotData || {}" />
                </template>
            </VsTableBodyRow>
        </template>
    </vue-draggable>
    <tbody v-if="loading && computedItems.length === 0">
        <VsTableBodyRow
            v-for="(dummy, index) in dummyTableItems"
            :key="dummy.id"
            :item="dummy"
            :headers="headers"
            :draggable="canDrag"
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
import VueDraggable from 'vuedraggable/src/vuedraggable';
import { computed, ComputedRef, defineComponent, PropType, ref, Ref, toRefs, watch, WritableComputedRef } from 'vue';
import type { TableHeader, TableItem } from './types';

import VsTableBodyRow from './VsTableBodyRow.vue';
import { VsIcon } from '@/icons';
import { stringUtil } from '@/utils/string';

export default defineComponent({
    props: {
        draggable: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        items: { type: Array as PropType<any[]>, default: () => [] as any[] },
        pagination: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    components: {
        VueDraggable,
        VsTableBodyRow,
        VsIcon,
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

        const dummyTableItems = new Array(4).fill({}).map((item) => {
            return { id: stringUtil.createID(), data: item };
        });

        return {
            itemSlots,
            computedItems,
            canDrag,
            dummyTableItems,
            emitRowClick,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
