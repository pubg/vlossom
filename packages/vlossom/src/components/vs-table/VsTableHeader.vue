<template>
    <thead>
        <tr :style="trStyle">
            <th class="draggable-th" v-if="draggable"></th>
            <th class="selectable-th" v-if="selectable">[s]</th>
            <th
                v-for="(header, index) in headers"
                :class="['table-th', { sortable: header.sortable }]"
                :style="{ width: header.width }"
                :key="`th-${index}`"
                @click="emitSort(header)"
            >
                <slot :name="`header-${header.key}`" :header="header">
                    {{ header.label }}
                </slot>
                <span v-if="header.sortable" class="sort-icon">
                    <!-- [TODO] Icon -->
                </span>
            </th>
            <th class="expandable-th" v-if="hasExpand">[e]</th>
        </tr>
    </thead>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { TableHeader } from './types';

export default defineComponent({
    props: {
        draggable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]> },
        hasExpand: { type: Boolean, default: false },
        selectable: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
    },
    emits: ['sort'],
    setup(_, { emit }) {
        function emitSort(header: TableHeader) {
            emit('sort', header);
        }

        return {
            emitSort,
        };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
