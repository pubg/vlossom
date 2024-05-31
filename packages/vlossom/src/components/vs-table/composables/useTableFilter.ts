import { Ref } from 'vue';
import { TableItem, TableFilter } from './../types';

export function useTableFilter() {
    function getFilteredTableItems(tableItems: TableItem[], filter: Ref<TableFilter>): TableItem[] {
        if (!filter.value) {
            return tableItems;
        }

        const filtered = tableItems.filter(({ data }) => {
            return Object.keys(filter.value).every((propertyName: string) => {
                const filterFn = filter.value[propertyName];
                if (!filterFn) {
                    return true;
                }
                return filterFn(data);
            });
        });
        return filtered;
    }

    return {
        getFilteredTableItems,
    };
}
