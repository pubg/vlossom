<template>
    <vs-responsive
        :class="[
            'vs-table',
            colorSchemeClass,
            { 'vs-dense': dense, 'vs-responsive': responsive, 'vs-primary': primary },
        ]"
        :style="computedStyleSet"
        :width="width"
        :grid="grid"
    >
        <div class="vs-table-wrap">
            <table class="vs-table-table">
                <caption v-if="$slots['caption']" class="vs-table-caption">
                    <slot name="caption" />
                </caption>
                <vs-table-header
                    :headers="headers"
                    :draggable="canDrag"
                    :expandable="hasExpand"
                    :loading="loading"
                    :search="search"
                    :search-placeholder="searchPlaceholder"
                    :selectable="hasSelectable"
                    :tr-style="trStyle"
                    v-model:sort-types="sortTypes"
                    @change:search-text="updateInnerSearchText"
                >
                    <template #check>
                        <vs-checkbox-node
                            class="vs-table-select vs-select-all"
                            type="checkbox"
                            :color-scheme="computedColorScheme"
                            :style-set="plainStyleSet?.checkboxNode"
                            :indeterminate="isIndeterminate"
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
                    :color-scheme="computedColorScheme"
                    :checkbox-style-set="plainStyleSet?.checkboxNode"
                    :filter="filter"
                    :draggable="canDrag"
                    :hasExpand="hasExpand"
                    :rows="rows"
                    :loading="loading"
                    :search-text="computedSearchText"
                    :searchable-keys="searchableKeys"
                    :selectable="hasSelectable"
                    :selected-items="selectedItems"
                    :sort-types="sortTypes"
                    :pagination="pagination"
                    :innerPage="innerPage"
                    :innerItemsPerPage="innerItemsPerPage"
                    :totalLength="totalLength"
                    :tr-style="trStyle"
                    v-model:is-selected-all="isSelectedAll"
                    v-model:total-items-length="totalItemsLength"
                    @change:selected-items="onChangeSelectedItems"
                    @change:paged-items="emitPagedItems"
                    @change:total-items="emitTotalItems"
                    @click-row="emitClickRow"
                    @drag="emitDrag"
                >
                    <template v-for="(_, name) in itemSlots" #[name]="slotData">
                        <slot :name="name" v-bind="slotData || {}" />
                    </template>
                </vs-table-body>
            </table>
        </div>
        <div class="vs-table-pagination" v-if="pagination">
            <vs-pagination
                v-model="innerPage"
                :disabled="paginationLength <= 1 || loading"
                :length="paginationLength"
                :edgeButtons="pageEdgeButtons"
                :color-scheme="computedColorScheme"
                :style-set="plainStyleSet?.pagination"
            />
            <vs-select
                class="vs-table-pagination-options"
                v-model="innerItemsPerPage"
                :options="paginationOptions"
                :disabled="loading"
                :color-scheme="computedColorScheme"
                :style-set="plainStyleSet?.paginationSelect"
                width="10rem"
                aria-label="pagination-options"
                option-label="label"
                option-value="value"
                no-clear
                no-message
                dense
            />
        </div>
    </vs-responsive>
</template>

<script lang="ts">
import { ComputedRef, PropType, Ref, computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useColorScheme, useStyleSet } from '@/composables';
import { getResponsiveProps } from '@/models';
import { useTableParams } from './composables';
import { VsComponent, type ColorScheme, LabelValue } from '@/declaration';
import { utils } from '@/utils';
import { DEFAULT_TABLE_ITEMS_PER_PAGE, DEFAULT_TABLE_PAGE_COUNT } from './constant';

import VsResponsive from '@/components/vs-responsive/VsResponsive.vue';
import VsTableHeader from './VsTableHeader.vue';
import VsTableBody from './VsTableBody.vue';
import VsPagination from '@/components/vs-pagination/VsPagination.vue';
import VsSelect from '@/components/vs-select/VsSelect.vue';
import VsCheckboxNode from '@/components/vs-checkbox/VsCheckboxNode.vue';

import type { VsTableStyleSet, TableHeader, TableRow, TableFilter, SortType } from './types';
import type { SortableEvent } from 'sortablejs';

const name = VsComponent.VsTable;
export default defineComponent({
    name,
    components: {
        VsResponsive,
        VsTableHeader,
        VsTableBody,
        VsCheckboxNode,
        VsPagination,
        VsSelect,
    },
    props: {
        ...getResponsiveProps(),
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | VsTableStyleSet>, default: '' },
        dense: { type: Boolean, default: false },
        draggable: { type: Boolean, default: false },
        filter: {
            type: Object as PropType<TableFilter>,
            default: null,
        },
        headers: { type: Array as PropType<TableHeader[]>, required: true },
        items: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
            required: true,
        },
        rows: { type: Object as PropType<TableRow>, default: () => ({}) },
        responsive: { type: Boolean, default: true },
        loading: { type: Boolean, default: false },
        pagination: { type: Boolean, default: false },
        paginationOptions: {
            type: Array as PropType<LabelValue<number>[]>,
            default: () => DEFAULT_TABLE_PAGE_COUNT,
        },
        pageEdgeButtons: { type: Boolean, default: false },
        primary: { type: Boolean, default: false },
        search: { type: Boolean, default: false },
        searchPlaceholder: { type: String, default: 'search' },
        searchText: { type: String, default: '' },
        searchableKeys: {
            type: Array as PropType<string[]>,
            default: () => [] as string[],
        },
        selectable: { type: Boolean, default: false },
        totalLength: { type: Number },
        // v-model
        itemsPerPage: { type: Number, default: DEFAULT_TABLE_ITEMS_PER_PAGE },
        page: { type: Number, default: 1 },
        pagedItems: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
        },
        selectedItems: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
        },
        totalItems: {
            type: Array as PropType<any[]>,
            default: () => [] as any[],
        },
    },
    emits: [
        'clickRow',
        'drag',
        'update',
        'update:itemsPerPage',
        'update:page',
        'update:pagedItems',
        'update:selectedItems',
        'update:totalItems',
    ],
    // expose: ['expand'],
    setup(props, ctx) {
        const {
            colorScheme,
            styleSet,
            draggable,
            headers,
            itemsPerPage,
            page,
            pagination,
            paginationOptions,
            rows,
            selectable,
            searchText,
            totalLength,
        } = toRefs(props);
        const { emit, slots } = ctx;

        const { computedColorScheme, colorSchemeClass } = useColorScheme(name, colorScheme);

        const { plainStyleSet, computedStyleSet } = useStyleSet<VsTableStyleSet>(name, styleSet);

        const headerSlots = computed(() => {
            return Object.keys(slots).reduce(
                (acc, slotName) => {
                    if (slotName.startsWith('header-')) {
                        acc[slotName] = slots[slotName];
                    }
                    return acc;
                },
                {} as { [key: string]: any },
            );
        });

        const itemSlots = computed(() => {
            return Object.keys(slots).reduce(
                (acc, slotName) => {
                    if (slotName.startsWith('item-') || slotName === 'expand') {
                        acc[slotName] = slots[slotName];
                    }
                    return acc;
                },
                {} as { [key: string]: any },
            );
        });

        const innerSearchText = ref('');
        function updateInnerSearchText(text: string) {
            innerSearchText.value = text;
        }
        const computedSearchText = computed(() => {
            return searchText.value || innerSearchText.value;
        });

        const canDrag = computed(() => {
            return draggable.value && !pagination.value;
        });

        const hasSelectable = computed(() => {
            return selectable.value || !!rows.value?.selectable;
        });

        const trStyle: ComputedRef<{ [key: string]: any }> = computed(() => {
            if (!headers.value) {
                return {};
            }
            const gridColumns = headers.value.map(({ width, minWidth, maxWidth }) => {
                if (width) {
                    return width;
                } else if (minWidth && maxWidth) {
                    return `minmax(${minWidth}, ${maxWidth})`;
                } else if (minWidth) {
                    return `minmax(${minWidth}, 1fr)`;
                } else if (maxWidth) {
                    return `minmax(5rem, ${maxWidth})`;
                }
                return '1fr';
            });
            if (hasSelectable.value) {
                gridColumns.unshift('3.4rem');
            }
            if (canDrag.value) {
                gridColumns.unshift('3rem');
            }
            if (hasExpand.value) {
                gridColumns.push('3rem');
            }
            return { gridTemplateColumns: gridColumns.join(' ') };
        });

        const isSelectedAll = ref(false);
        const isIndeterminate = ref(false);

        function onToggleCheck(check: boolean) {
            isSelectedAll.value = check;
        }

        const sortTypes: Ref<{ [key: string]: SortType }> = ref({});

        const hasExpand = computed(() => !!slots['expand']);
        const tableBodyRef: Ref<typeof VsTableBody | null> = ref(null);

        const expand = (index: number) => {
            return tableBodyRef.value?.expand(index);
        };

        const innerPage = ref(-1);
        const innerItemsPerPage = ref(-1);
        const totalItemsLength = ref(0);

        const paginationLength = computed(() => {
            if (innerItemsPerPage.value === -1) {
                return 1;
            }
            const length = totalLength.value || totalItemsLength.value;
            return Math.ceil(length / innerItemsPerPage.value) || 1;
        });

        watch(innerPage, (p: number) => {
            isSelectedAll.value = false;
            emit('update:selectedItems', []);
            emit('update:page', p);
        });

        watch(
            page,
            (p: number) => {
                if (p <= 0) {
                    innerPage.value = 1;
                } else if (p > paginationLength.value) {
                    innerPage.value = paginationLength.value;
                } else {
                    innerPage.value = p;
                }
            },
            { immediate: true },
        );

        watch(innerItemsPerPage, (p: number) => {
            isSelectedAll.value = false;
            emit('update:selectedItems', []);
            emit('update:itemsPerPage', p);
        });

        watch(
            itemsPerPage,
            (ipp: number) => {
                const optionValues = paginationOptions.value.map((o) => o.value);
                if (optionValues.includes(ipp)) {
                    innerItemsPerPage.value = ipp;
                } else {
                    innerItemsPerPage.value = paginationOptions.value[0].value;
                }
            },
            { immediate: true },
        );

        useTableParams(innerPage, innerItemsPerPage, sortTypes, computedSearchText, ctx);

        function onChangeSelectedItems(selectedItems: any[]) {
            isIndeterminate.value = selectedItems.length > 0 ? true : false;
            emit('update:selectedItems', selectedItems);
        }

        function emitPagedItems(items: any[]) {
            emit('update:pagedItems', items);
        }

        function emitTotalItems(items: any[]) {
            emit('update:totalItems', items);
        }

        function emitClickRow(rowItem: any, rowIndex: number) {
            emit('clickRow', rowItem, rowIndex);
        }

        function emitDrag(evt: SortableEvent) {
            emit('drag', evt);
        }

        return {
            computedColorScheme,
            colorSchemeClass,
            computedStyleSet,
            plainStyleSet,
            computedSearchText,
            headerSlots,
            itemSlots,
            trStyle,
            sortTypes,
            hasExpand,
            isSelectedAll,
            isIndeterminate,
            utils,
            innerSearchText,
            updateInnerSearchText,
            innerPage,
            innerItemsPerPage,
            paginationLength,
            totalItemsLength,
            canDrag,
            hasSelectable,
            onToggleCheck,
            onChangeSelectedItems,
            emitPagedItems,
            emitTotalItems,
            emitClickRow,
            emitDrag,
            // expose
            expand,
        };
    },
});
</script>

<style lang="scss" src="./VsTable.scss" />
