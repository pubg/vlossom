import { ComputedRef, Ref, computed, watch } from 'vue';
import { utils } from '@/utils';
import { SortType, TableParams } from '../types';

export function useTableParams(
    page: Ref<number>,
    itemsPerPage: Ref<number>,
    sortTypes: Ref<{ [key: string]: SortType }>,
    searchText: Ref<string>,
    ctx: any,
) {
    const params: ComputedRef<TableParams> = computed(() => ({
        page: page.value,
        itemsPerPage: itemsPerPage.value,
        sortTypes: sortTypes.value,
        searchText: searchText.value,
    }));

    watch(
        params,
        (newParams, oldParams) => {
            if (utils.object.isEqual(oldParams, newParams)) {
                return;
            }

            ctx.emit('update', newParams);
        },
        { deep: true, immediate: true },
    );
}
