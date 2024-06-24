<template>
    <thead>
        <tr v-if="search" class="search">
            <th>
                <vs-icon class="search-icon" icon="search" size="26px" />
                <vs-input
                    class="search-input"
                    :placeholder="searchPlaceholder"
                    @change="emitSearchText"
                    no-message
                    dense
                />
            </th>
        </tr>
        <tr :style="trStyle">
            <th class="draggable-th" v-if="draggable">drag</th>
            <th class="selectable-th" v-if="selectable" aria-label="select">
                <slot name="check" />
            </th>
            <th
                v-for="(header, index) in headers"
                :key="`th-${index}`"
                :class="['table-th', { sortable: header.sortable }]"
                :style="{ width: header.width }"
                @click.stop="updateSortTypes(header)"
            >
                <slot :name="`header-${header.key}`" :header="header">
                    {{ header.label }}
                </slot>
                <span v-if="header.sortable" class="sort-icon">
                    <vs-icon :icon="getSortIcon(sortTypes[header.key])" size="1.2rem" />
                </span>
            </th>
            <th class="expandable-th" v-if="expandable">expand</th>
        </tr>
    </thead>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import { VsIcon } from '@/icons';
import VsInput from '@/components/vs-input/VsInput.vue';
import { SortType, type TableHeader } from './types';
import { useSortableHeader } from './composables/useSortableHeader';

export default defineComponent({
    name: 'VsTableHeader',
    components: { VsIcon, VsInput },
    props: {
        draggable: { type: Boolean, default: false },
        expandable: { type: Boolean, default: false },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        search: { type: Boolean, default: false },
        searchPlaceholder: { type: String, default: 'search' },
        selectable: { type: Boolean, default: false },
        trStyle: {
            type: Object as PropType<{ [key: string]: any }>,
            default: () => ({}),
        },
        // v-model
        sortTypes: {
            type: Object as PropType<{ [key: string]: SortType }>,
            default: () => ({}),
        },
    },
    emits: ['change:searchText', 'update:sortTypes'],
    setup(props, ctx) {
        const { headers } = toRefs(props);

        const { updateSortTypes, getSortIcon } = useSortableHeader(headers, ctx);

        function emitSearchText(searchText: string) {
            ctx.emit('change:searchText', searchText);
        }

        return { updateSortTypes, getSortIcon, emitSearchText };
    },
});
</script>
<style lang="scss" scoped src="./VsTable.scss" />
