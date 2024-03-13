import { Ref } from 'vue';
import { TableHeader, TableItem, SortType } from '../types';

export function useTableSort(sortTypes: Ref<{ [key: string]: SortType }>) {
    function updateSortType({ key, sortable }: TableHeader) {
        if (!sortable) {
            return;
        }
        Object.keys(sortTypes.value).forEach((sortKey: string) => {
            if (key === sortKey) {
                const type = sortTypes.value[sortKey];
                sortTypes.value[sortKey] = (type + 1) % 3;
            } else {
                sortTypes.value[sortKey] = SortType.NONE;
            }
        });
    }

    function getSortIcon(type: SortType) {
        switch (type) {
            case SortType.ASCEND:
                return 'expandMore';
            case SortType.DESCEND:
                return 'expandLess';
            case SortType.NONE:
            default:
                return 'unfoldMore';
        }
    }

    function getSortedItems(items: TableItem[]) {
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
        updateSortType,
        getSortIcon,
        getSortedItems,
    };
}
