import { Ref } from 'vue';
import { TableItem, TableFilter } from '../types';

export default function useTableFilter() {
    function getFilteredItems(items: TableItem[], filter: Ref<TableFilter>) {
        if (!filter.value) {
            return items;
        }

        const filtered = items.filter(({ data }) => {
            return Object.keys(filter.value).every((propertyName: string) => {
                const filterFunc = filter.value[propertyName];
                if (!filterFunc) {
                    return true;
                }
                return filterFunc(data);
            });
        });
        return filtered;
    }

    return {
        getFilteredItems,
    };
}
