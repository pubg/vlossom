import { Ref, ref, watch } from 'vue';
import { SortType, TableHeader } from '../types';

export function useSortableHeader(headers: Ref<TableHeader[]>, ctx: any) {
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
        ctx.emit('update:sortTypes', sortTypes.value);
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
    return {
        sortTypes,
        updateSortType,
        getSortIcon,
    };
}