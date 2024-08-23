import { Ref, ref, watch } from 'vue';
import { SortType, TableHeader } from '../types';

export function useSortableHeader(headers: Ref<TableHeader[]>, ctx: any) {
    const innerSortTypes: Ref<{ [key: string]: SortType }> = ref({});

    const initSortTypes = () => {
        innerSortTypes.value = headers.value.reduce(
            (acc, { key, sortable = false }) => {
                if (sortable) {
                    acc[key] = SortType.NONE;
                }
                return acc;
            },
            {} as { [key: string]: SortType },
        );
    };

    watch(headers, initSortTypes, { immediate: true });

    function updateSortTypes({ key, sortable }: TableHeader) {
        if (!sortable) {
            return;
        }
        const newSortTypes = { ...innerSortTypes.value };
        Object.keys(innerSortTypes.value).forEach((sortKey: string) => {
            if (key === sortKey) {
                const type = innerSortTypes.value[sortKey];
                newSortTypes[sortKey] = (type + 1) % 3;
            } else {
                newSortTypes[sortKey] = SortType.NONE;
            }
        });
        innerSortTypes.value = newSortTypes;
        ctx.emit('update:sortTypes', newSortTypes);
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
        updateSortTypes,
        getSortIcon,
    };
}
