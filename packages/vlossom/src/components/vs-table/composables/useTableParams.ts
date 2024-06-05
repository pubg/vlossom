import { Ref, computed, watch } from 'vue';
import { utils } from '@/utils';
import { SortType } from './../types';

export function useTableParams(
    page: Ref<number>,
    itemsPerPage: Ref<number>,
    sortTypes: Ref<{ [key: string]: SortType }>,
    searchText: Ref<string>,
    ctx: any,
) {
    const params = computed(() => ({
        page: page.value,
        itemsPerPage: itemsPerPage.value,
        sortTypes: sortTypes.value,
        searchText: searchText.value,
    }));

    let oldParams: typeof params.value | null = null;

    watch(
        params,
        () => {
            if (utils.object.isEqual(oldParams, params.value)) {
                return;
            }

            if (oldParams && oldParams.searchText !== params.value.searchText) {
                page.value = 1;
            }

            ctx.emit('update:params', params.value);
            oldParams = params.value;
        },
        { deep: true, immediate: true },
    );
}
