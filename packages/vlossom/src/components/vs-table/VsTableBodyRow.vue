<template>
    <tr>
        <td v-if="draggable"></td>
        <td v-if="selectable"></td>
        <td class="table-td" v-for="(cell, index) in getRowData(item.data)" :key="`td-${index}`" :data-label="cell.key">
            <slot :name="`item-${cell.key}`" :header="getHeader(cell.key)" :item="item.data" :value="cell.value">
                {{ getTableData(cell.key, cell.value, item.data) }}
            </slot>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import type { TableHeader, TableItem } from './types';

export default defineComponent({
    props: {
        loading: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        hasExpand: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        item: { type: Object as PropType<TableItem>, required: true }, // TODO
        selectable: { type: Boolean, default: false },
    },
    setup(props) {
        const { headers, item } = toRefs(props);

        // [TODO] Expand
        // [TODO] Select
        // [TODO] DummyRow

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
            if (!headers.value) {
                return undefined;
            }
            return headers.value.find((header) => header.key === key);
        }

        function getTableData(key: string, value: any, rowItem: any) {
            const header = getHeader(key);
            if (header && header.filter) {
                return header.filter(value, rowItem);
            }
            return value;
        }

        return {
            getRowData,
            getHeader,
            getTableData,
        };
    },
});
</script>
