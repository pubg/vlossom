import { Ref, WritableComputedRef, computed, ComputedRef, ref, watch } from 'vue';
import type { TableItem, TableRow } from '../types';
import { utils } from '@/utils';

export function useTableSelect(
    selectable: Ref<boolean>,
    selectedItems: Ref<any[]>,
    isSelectedAll: Ref<boolean>,
    innerTableItems: ComputedRef<TableItem[]>,
    computedTableItems: WritableComputedRef<TableItem[]>,
    rows: Ref<TableRow>,
    ctx: any,
) {
    const selectedIds: Ref<string[]> = ref([]);

    const selectableItems = computed(() => {
        const { selectable: selectableFn } = rows.value || {};

        if (!selectableFn) {
            return selectable.value ? computedTableItems.value : [];
        }
        return computedTableItems.value.filter((item, index) => {
            return selectableFn(item.data, index);
        });
    });

    const computedSelectedAll: WritableComputedRef<boolean> = computed({
        get(): boolean {
            return selectableItems.value.length > 0 && selectedIds.value.length === selectableItems.value.length;
        },
        set(isSelectedAll: boolean) {
            if (isSelectedAll) {
                selectedIds.value = selectableItems.value.map((item) => item.id);
            } else {
                selectedIds.value = [];
            }
        },
    });

    watch(selectedIds, (newVal, oldVal) => {
        if (utils.object.isEqual(newVal, oldVal)) {
            return;
        }
        const newSelectedItems = computedTableItems.value
            .filter((item) => {
                return selectedIds.value.includes(item.id);
            })
            .map((item) => item.data);
        ctx.emit('change:selectedItems', newSelectedItems);
    });

    watch(
        selectedItems,
        (selectedItems: any[]) => {
            const newSelectedIds = innerTableItems.value
                .filter((tableItem) => {
                    return selectedItems.some((item) => utils.object.isEqual(tableItem.data, item));
                })
                .map((tableItem) => tableItem.id);
            selectedIds.value = newSelectedIds;
        },
        { immediate: true },
    );

    watch(computedSelectedAll, (isSelectedAll: boolean) => {
        ctx.emit('update:isSelectedAll', isSelectedAll);
    });

    watch(isSelectedAll, (isSelectedAll: boolean) => {
        if (computedSelectedAll.value === isSelectedAll) {
            return;
        }
        computedSelectedAll.value = isSelectedAll;
    });

    function isSelected(id: string): boolean {
        return selectedIds.value.includes(id);
    }

    function toggleSelect(check: boolean, id: string) {
        if (check) {
            selectedIds.value = [...selectedIds.value, id];
        } else {
            selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id);
        }
    }

    return {
        isSelected,
        toggleSelect,
    };
}
