<template>
    <thead>
        <tr :style="trStyle">
            <th class="draggable-th" v-if="draggable"></th>
            <th class="selectable-th" v-if="selectable"> <!-- [TODO] select --></th>
            <th
                v-for="(header, index) in headers"
                :key="`th-${index}`"
                :class="['table-th', { sortable: header.sortable }]"
                :style="{ width: header.width }"
            >
                <slot :name="`header-${header.key}`" :header="header">
                    {{ header.label }}
                </slot>
                <span v-if="header.sortable" class="sort-icon">
                    <!-- [TODO] sort -->
                </span>
            </th>
            <th class="expandable-th" v-if="expandable"></th>
        </tr>
    </thead>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { TableHeader } from './types';

export default defineComponent({
    name: 'vs-table-header',
    props: {
        draggable: { type: Boolean, default: false },
        expandable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        selectable: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    emits: ['sort'],
    setup() {
        // [TODO] sort
        return {
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
