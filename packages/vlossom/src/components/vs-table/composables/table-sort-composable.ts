import { Ref } from 'vue';
import { TableItem, SortType } from './../types';

export function useTableSort() {
    function getSortedTableItems(items: TableItem[], sortTypes: Ref<{ [key: string]: SortType }>) {
        const sortKey = Object.keys(sortTypes.value).find((key) => {
            return sortTypes.value[key] !== SortType.NONE;
        });
        if (!sortKey) {
            return items;
        }

        const sortType = sortTypes.value[sortKey];
        const sorted = [...items].sort((itemA: TableItem, itemB: TableItem) => {
            const a = itemA.data[sortKey];
            const b = itemB.data[sortKey];
            const comparison = +(a > b) || +(a === b) - 1;
            return sortType === SortType.ASCEND ? comparison : -comparison;
        });
        return sorted;
    }

    return {
        getSortedTableItems,
    };
}
