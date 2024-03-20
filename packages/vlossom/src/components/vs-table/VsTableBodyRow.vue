<template>
    <tr :style="trStyle" :class="{ skeleton: loading }">
        <td class="draggable-td handle" v-if="draggable">
            <vs-icon v-if="!loading" icon="drag" size="1.8rem" />
        </td>
        <td class="selectable-td" v-if="selectable">
            <div v-if="loading" class="skeleton"></div>
            <div v-else-if="isSelectableRow">
                <slot name="check" />
            </div>
        </td>
        <td
            class="table-td"
            v-for="(cell, index) in getRowData(item.data)"
            :key="`td-${index}`"
            :data-label="getHeader(cell.key)?.label"
        >
            <div v-if="loading" class="skeleton"></div>
            <div v-else class="table-data">
                <slot
                    :name="`item-${cell.key}`"
                    :header="getHeader(cell.key)"
                    :item="item.data"
                    :value="cell.value"
                    :itemIndex="rowIndex"
                    :valueIndex="index"
                >
                    {{ getTableData(cell.key, cell.value, item.data) }}
                </slot>
            </div>
        </td>

        <td v-if="expandable" class="expandable-td">
            <button
                v-if="isExpandableRow"
                type="button"
                @click.stop="emitToggleExpand(item.id)"
                :disabled="loading"
                :class="{ expanded }"
                :aria-label="`expand ${item.id}`"
            >
                <vs-icon size="1.2rem" icon="keyboardArrowUp" />
            </button>
        </td>

        <td v-if="expandable && expanded" :class="['expanded-row-content', { 'scale-up-ver-top': expanded }]">
            <div class="expand-contents fade-in">
                <slot name="expand" :id="item.id" :item="item.data" :itemIndex="rowIndex" />
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { VsIcon } from '@/icons';

import type { TableHeader, TableItem, TableRow } from './types';

export default defineComponent({
    name: 'vs-table-body-row',
    components: { VsIcon },
    props: {
        loading: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        expanded: { type: Boolean, default: false },
        expandable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        item: { type: Object as PropType<TableItem>, required: true },
        rowIndex: { type: Number, required: true },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        selectable: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    emits: ['toggleExpand'],
    setup(props, { emit }) {
        const { headers, item, rowIndex, rows } = toRefs(props);

        function getRowData(row: { [key: string]: any }) {
            if (!headers.value) {
                return Object.entries(item.value.data).map(([key, value]) => ({ key, value }));
            }

            return headers.value.map((header) => {
                const { key } = header;
                return { key, value: row[key] };
            });
        }

        function getHeader(key: string): TableHeader | undefined {
            return headers.value.find((header) => header.key === key);
        }

        function getTableData(key: string, value: any, rowItem: any) {
            const header = getHeader(key);
            if (header && header.filter) {
                return header.filter(value, rowItem);
            }
            return value;
        }

        const isDummyRow = computed(() => {
            return !Object.keys(item.value.data).length;
        });

        const isSelectableRow = computed(() => {
            const { data } = item.value;
            const { selectable: rowSelectableFn } = rows.value || {};

            return !rowSelectableFn || rowSelectableFn(data, rowIndex.value);
        });

        const isExpandableRow: ComputedRef<boolean> = computed(() => {
            const { data } = item.value;
            const { expandable: rowExpandableFn } = rows.value || {};

            return !rowExpandableFn || rowExpandableFn(data, rowIndex.value);
        });

        function emitToggleExpand(id: string) {
            emit('toggleExpand', id);
        }

        return {
            isDummyRow,
            isSelectableRow,
            isExpandableRow,
            getRowData,
            getHeader,
            getTableData,
            emitToggleExpand,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
