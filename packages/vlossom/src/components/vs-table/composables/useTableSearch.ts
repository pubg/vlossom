import { computed, Ref } from 'vue';
import type { TableHeader, TableItem } from '../types';
import { utils } from '@/utils';

export default function useTableSearch(headers: Ref<TableHeader[]>) {
    const searchTargetKeys = computed(() => {
        return headers.value
            .filter((header: TableHeader) => header.searchable !== false)
            .map((header: TableHeader) => header.key);
    });

    function getSearchedItems(items: Ref<TableItem[]>, keyword: Ref<string>) {
        if (keyword.value.trim() === '') {
            return items.value;
        }
        const lowercaseKeyword = keyword.value.toLowerCase();
        return items.value.filter(({ data }) => {
            const searchableData = utils.object.pick(data, searchTargetKeys.value);
            const target = Object.values(searchableData).join(' ').toLowerCase();
            return target.includes(lowercaseKeyword);
        });
    }

    return {
        getSearchedItems,
    };
}
