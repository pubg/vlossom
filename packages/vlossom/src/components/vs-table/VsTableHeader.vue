<template>
    <thead>
        <tr :style="trStyle">
            <th class="draggable-th" v-if="draggable">drag</th>
            <th class="selectable-th" v-if="selectable"> <!-- [TODO] select --></th>
            <th
                v-for="(header, index) in headers"
                :key="`th-${index}`"
                :class="['table-th', { sortable: header.sortable }]"
                :style="{ width: header.width }"
                @click="updateSortType(header)"
            >
                <slot :name="`header-${header.key}`" :header="header">
                    {{ header.label }}
                </slot>
                <span v-if="header.sortable" class="sort-icon">
                    <vs-icon :icon="getSortIcon(sortTypes[header.key])" size="1.4rem" />
                </span>
            </th>
            <th class="expandable-th" v-if="expandable"></th>
        </tr>
    </thead>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { useTableSort } from './composables/useTableSort';
import { VsIcon } from '@/icons';

import type { SortType, TableHeader } from './types';

export default defineComponent({
    name: 'vs-table-header',
    props: {
        draggable: { type: Boolean, default: false },
        expandable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        selectable: { type: Boolean, default: false },
        sortTypes: {
            type: Object as PropType<{ [key: string]: SortType }>,
            default: () => ({}),
        },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    components: {
        VsIcon,
    },
    emits: ['sort'],
    setup(props) {
        const { sortTypes } = toRefs(props);

        const { updateSortType, getSortIcon } = useTableSort(sortTypes);

        return { updateSortType, getSortIcon };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
