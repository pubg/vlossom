import { Ref } from 'vue';
import { TableItem, TableFilter } from '../types';

export function useTableFilter() {
    function getFilteredItems(items: TableItem[], filter: Ref<TableFilter>) {
        if (!filter.value) {
            return items;
        }

        const filtered = items.filter(({ data }) => {
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
        getFilteredItems,
    };
}
