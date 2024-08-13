<template>
    <tr :style="trStyle" :class="['vs-table-tr', rowState, { 'vs-table-row-loading': loading }]">
        <td class="vs-table-td vs-table-draggable-td vs-handle" v-if="draggable">
            <vs-icon v-if="!loading" icon="drag" size="1.6rem" />
        </td>
        <td class="vs-table-td vs-table-selectable-td" v-if="selectable">
            <slot v-if="isSelectableRow && !loading" name="check" />
        </td>
        <td
            class="vs-table-td"
            v-for="(cell, index) in getRowData(item.data)"
            :key="`td-${index}`"
            :data-label="getHeader(cell.key)?.label"
        >
            <vs-skeleton
                v-if="loading"
                class="vs-table-skeleton"
                :color-scheme="colorScheme"
                :style-set="{ borderRadius: 'var(--vs-radius-sm)' }"
            />
            <div v-else class="vs-table-data">
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

        <td v-if="expandable" class="vs-table-td vs-table-expandable-td">
            <button
                v-if="isExpandableRow"
                type="button"
                class="vs-table-expand-button"
                :disabled="loading"
                :class="{ 'vs-expanded': expanded }"
                :aria-label="`expand ${item.id}`"
                @click.stop="emitToggleExpand(item.id)"
            >
                <vs-icon size="1.5rem" icon="keyboardArrowUp" />
            </button>
        </td>

        <td
            v-if="expandable && expanded"
            :class="['vs-table-td vs-table-expanded-row-content', { 'scale-up-ver-top': expanded }]"
        >
            <div class="vs-table-expand-contents fade-in">
                <slot name="expand" :id="item.id" :item="item.data" :itemIndex="rowIndex" />
            </div>
        </td>
    </tr>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { ColorScheme, UIState } from '@/declaration';
import { VsIcon } from '@/icons';
import VsSkeleton from '@/components/vs-skeleton/VsSkeleton.vue';

import type { TableHeader, TableItem, TableRow } from './types';

export default defineComponent({
    name: 'VsTableBodyRow',
    components: { VsIcon, VsSkeleton },
    props: {
        loading: { type: Boolean, default: false },
        colorScheme: { type: String as PropType<ColorScheme> },
        draggable: { type: Boolean, default: false },
        expanded: { type: Boolean, default: false },
        expandable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        item: { type: Object as PropType<TableItem>, required: true },
        rowIndex: { type: Number, required: true },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        selectable: { type: Boolean, default: false },
        selected: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    emits: ['toggleExpand'],
    setup(props, { emit }) {
        const { headers, item, rowIndex, rows, selected } = toRefs(props);

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

        const rowState = computed(() => {
            if (selected.value) {
                return UIState.Selected;
            }

            const { state: rowStateFn } = rows.value || {};
            if (!rowStateFn) {
                return;
            }
            const { data } = item.value;
            return rowStateFn(data, rowIndex.value);
        });

        function emitToggleExpand(id: string) {
            emit('toggleExpand', id);
        }

        return {
            isDummyRow,
            isSelectableRow,
            isExpandableRow,
            rowState,
            getRowData,
            getHeader,
            getTableData,
            emitToggleExpand,
        };
    },
});
</script>
<style lang="scss" src="./VsTable.scss" />
