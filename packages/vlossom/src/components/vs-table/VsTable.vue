<template>
    <div :class="['vs-table', `vs-${computedColorScheme}`, dense ? 'dense' : '']" :style="computedStyleSet">
        <div class="table-wrap">
            <table>
                <vs-table-header
                    :headers="headers"
                    :draggable="draggable"
                    :loading="loading"
                    :sort-types="sortTypes"
                    :tr-style="trStyle"
                >
                    <template v-for="(_, name) in headerSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-header>
                <vs-table-body
                    :items="items"
                    :headers="headers"
                    :filter="filter"
                    :draggable="draggable"
                    :loading="loading"
                    :search="search"
                    :searchable-keys="searchableKeys"
                    :sort-types="sortTypes"
                    :tr-style="trStyle"
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
import { ComputedRef, PropType, Ref, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { VsComponent, type ColorScheme } from '@/declaration';

import VsTableHeader from './VsTableHeader.vue';
import VsTableBody from './VsTableBody.vue';

import { VsTableStyleSet, TableHeader, TableFilter, SortType } from './types';

const name = VsComponent.VsTable;

export default defineComponent({
    name,
    components: {
        VsTableHeader,
        VsTableBody,
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
        loading: { type: Boolean, default: false },
        search: { type: String, default: '' },
        searchableKeys: { type: Array as PropType<string[]>, default: () => [] as string[] },
    },
    setup(props, { slots }) {
        const { colorScheme, styleSet, draggable, headers } = toRefs(props);

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

            if (draggable.value) {
                gridColumns.unshift('3rem');
            }

            return { gridTemplateColumns: gridColumns.join(' ') };
        });

        const sortTypes: Ref<{ [key: string]: SortType }> = ref({});

        const initSortTypes = () => {
            sortTypes.value = headers.value.reduce((acc, { key, sortable = false }) => {
                if (sortable) {
                    acc[key] = SortType.NONE;
                }
                return acc;
            }, {} as { [key: string]: SortType });
        };

        watch(headers, initSortTypes, { immediate: true });

        return {
            computedColorScheme,
            computedStyleSet,
            headerSlots,
            itemSlots,
            trStyle,
            sortTypes,
        };
    },
});
</script>

<style lang="scss" scoped src="./VsTable.scss" />
