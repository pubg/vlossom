<template>
    <tr :style="trStyle" :class="{ skeleton: loading }">
        <td class="draggable-td handle" v-if="draggable">
            <vs-icon v-if="!loading" icon="drag" size="1.8rem" />
        </td>
        <td v-if="selectable"></td>
        <td class="table-td" v-for="(cell, index) in getRowData(item.data)" :key="`td-${index}`" :data-label="getHeader(cell.key)?.label">
            <div v-if="loading" :class="['skeleton']"></div>
            <div v-else :class="['table-data']">
                <slot :name="`item-${cell.key}`" :header="getHeader(cell.key)" :item="item.data" :value="cell.value">
                    {{ getTableData(cell.key, cell.value, item.data) }}
                </slot>
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
import type { TableHeader, TableItem } from './types';
import { VsIcon } from '@/icons';

export default defineComponent({
    components: { VsIcon },
    props: {
        loading: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        hasExpand: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        item: { type: Object as PropType<TableItem>, required: true }, 
        selectable: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    setup(props) {
        const { headers, item } = toRefs(props);

        const isDummyRow = computed(() => {
            return !Object.keys(item.value.data).length;
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
            isDummyRow,
            getRowData,
            getHeader,
            getTableData,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
