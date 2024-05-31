import { computed, Ref } from 'vue';
import type { TableHeader, TableItem } from './../types';
import { utils } from '@/utils';

export function useTableSearch(headers: Ref<TableHeader[]>, searchableKeys: Ref<string[]>) {
    const searchTargetKeys = computed(() => {
        return headers.value
            .filter((header: TableHeader) => header.searchable !== false)
            .map((header: TableHeader) => header.key)
            .concat(searchableKeys.value);
    });

    function getSearchedTableItems(tableItems: TableItem[], keyword: Ref<string>): TableItem[] {
        if (keyword.value.trim() === '') {
            return tableItems;
        }
        const lowercaseKeyword = keyword.value.trim().toLowerCase();
        return tableItems.filter(({ data }) => {
            const searchableData = utils.object.pick(data, searchTargetKeys.value);
            const target = Object.values(searchableData).join(' ').toLowerCase();
            return target.includes(lowercaseKeyword);
        });
    }

    return {
        getSearchedTableItems,
    };
}
