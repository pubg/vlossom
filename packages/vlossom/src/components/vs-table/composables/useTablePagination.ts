import { Ref } from 'vue';
import { TableItem } from '../types';

export function useTablePagination() {
    function getPagedTableItems(
        tableItems: TableItem[],
        pagination: Ref<boolean>,
        page: Ref<number>,
        itemsPerPage: Ref<number>,
        totalLength: Ref<number>,
    ): TableItem[] {
        if (!pagination.value || totalLength.value > 0 || itemsPerPage.value === -1) {
            return tableItems;
        }

        return tableItems.slice((page.value - 1) * itemsPerPage.value, page.value * itemsPerPage.value);
    }

    return {
        getPagedTableItems,
    };
}
