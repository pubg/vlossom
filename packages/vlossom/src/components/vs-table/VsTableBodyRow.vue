<template>
    <tr :style="trStyle" :class="{ skeleton: loading }">
        <td class="draggable-td handle" v-if="draggable">
            <vs-icon v-if="!loading" icon="drag" size="1.8rem" />
        </td>
        <td class="selectable-td" v-if="selectable"><!-- [TODO] select --></td>
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
                v-if="isExpandlableRow"
                type="button"
                @click.stop="toggleExpand(item.id)"
                :disabled="loading"
                :class="{ expanded: isExpanded(item.id) }"
                :aria-label="`expand ${item.id}`"
            >
                <vs-icon size="1.2rem" icon="keyboardArrowUp" />
            </button>
        </td>

        <td
            v-if="expandable && isExpanded(item.id)"
            :class="['expanded-row-content', { 'scale-up-ver-top': isExpanded(item.id) }]"
        >
            <div class="expand-contents fade-in">
                <slot name="expand" :id="item.id" :item="item.data" :itemIndex="rowIndex" />
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { VsIcon } from '@/icons';
import useTableExpand from './composables/useTableExpand';

import type { TableHeader, TableItem, TableRow } from './types';

export default defineComponent({
    name: 'vs-table-body-row',
    components: { VsIcon },
    props: {
        loading: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        expandedIds: { type: Array as PropType<string[]>, default: () => [] },
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
    setup(props) {
        const { expandedIds, expandable, headers, item, rowIndex, rows } = toRefs(props);

        const { isExpanded, toggleExpand } = useTableExpand(expandable, expandedIds);

        const isExpandlableRow: ComputedRef<boolean> = computed(() => {
            const { data } = item.value;
            const { expandable: rowExpandableFn } = rows.value || {};

            return !rowExpandableFn || rowExpandableFn(data, rowIndex.value);
        });

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

        return {
            isDummyRow,
            getRowData,
            getHeader,
            getTableData,
            isExpanded,
            toggleExpand,
            isExpandlableRow,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
