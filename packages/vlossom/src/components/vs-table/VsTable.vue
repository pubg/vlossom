<template>
    <div :class="['vs-table', `vs-${computedColorScheme}`, dense ? 'dense' : '']" :style="computedStyleSet">
        <div class="table-wrap">
            <table>
                <vs-table-header
                    :headers="headers"
                    :draggable="draggable"
                    :expandable="hasExpand"
                    :selectable="selectable"
                    :loading="loading"
                    :tr-style="trStyle"
                    v-model:sort-types="sortTypes"
                >
                    <template #check>
                        <vs-check-node
                            v-if="!loading"
                            :id="utils.string.createID()"
                            type="checkbox"
                            :color-scheme="colorScheme"
                            :checked="isSelectedAll"
                            aria-label="select-all"
                            @toggle="onToggleCheck"
                        />
                    </template>
                    <template v-for="(_, name) in headerSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-header>
                <vs-table-body
                    ref="tableBodyRef"
                    :items="items"
                    :headers="headers"
                    :filter="filter"
                    :draggable="draggable"
                    :hasExpand="hasExpand"
                    :rows="rows"
                    :loading="loading"
                    :search="search"
                    :searchable-keys="searchableKeys"
                    :selectable="selectable"
                    :sort-types="sortTypes"
                    :tr-style="trStyle"
                    v-model:isSelectedAll="isSelectedAll"
                    :selected-items="selectedItems"
                    @change:selected-items="emitSelectedItems"
                >
                    <template v-for="(_, name) in itemSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-body>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { ComputedRef, PropType, Ref, computed, defineComponent, ref, toRefs } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';
import { utils } from '@/utils';

import VsTableHeader from './VsTableHeader.vue';
import VsTableBody from './VsTableBody.vue';
import { VsCheckNode } from '@/nodes';

import type { VsTableStyleSet, TableHeader, TableRow, TableFilter, SortType } from './types';

const name = VsComponent.VsTable;

export default defineComponent({
    name,
    components: {
        VsTableHeader,
        VsTableBody,
        VsCheckNode,
    },
    props: {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTableStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        filter: {
            type: Object as PropType<TableFilter>,
            default: null,
        },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: { type: Array as PropType<any[]>, default: () => [] as any[], required: true },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        loading: { type: Boolean, default: false },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
        selectable: { type: Boolean, default: false },
        // v-model
        selectedItems: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
        },
    },
    expose: ['expand'],
    emits: ['update:selectedItems'],
    setup(props, { slots, emit }) {
        const { colorScheme, styleSet, draggable, headers, selectable } = toRefs(props);

        const { computedColorScheme } = useColorScheme(name, colorScheme);

        const { computedStyleSet } = useStyleSet<VsTableStyleSet>(name, styleSet);

        const headerSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('header-')) {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });

        const itemSlots = computed(() => {
            return Object.keys(slots).reduce((acc, slotName) => {
                if (slotName.startsWith('item-') || slotName === 'expand') {
                    acc[slotName] = slots[slotName];
                }
                return acc;
            }, {} as { [key: string]: any });
        });

        const trStyle: ComputedRef<{ [key: string]: any }> = computed(() => {
            if (!headers.value) {
                return {};
            }
            const gridColumns = headers.value.map((h) => {
                return h.width || 'minmax(20rem, 1fr)';
            });
            if (selectable.value) {
                gridColumns.unshift('4.8rem');
            }
            if (draggable.value) {
                gridColumns.unshift('3rem');
            }
            if (hasExpand.value) {
                gridColumns.push('4.4rem');
            }
            return { gridTemplateColumns: gridColumns.join(' ') };
        });

        const isSelectedAll = ref(false);

        function onToggleCheck(check: boolean) {
            isSelectedAll.value = check;
        }

        function emitSelectedItems(e: any[]) {
            emit('update:selectedItems', e);
        }

        const sortTypes: Ref<{ [key: string]: SortType }> = ref({});

        const hasExpand = computed(() => !!slots['expand']);
        const tableBodyRef: Ref<typeof VsTableBody | null> = ref(null);

        const expand = (index: number) => {
            return tableBodyRef.value?.expand(index);
        };

        return {
            computedColorScheme,
            computedStyleSet,
            headerSlots,
            itemSlots,
            trStyle,
            sortTypes,
            hasExpand,
            isSelectedAll,
            utils,
            onToggleCheck,
            emitSelectedItems,
            // expose
            expand,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTable.scss" />
