import { ComputedRef, Ref, computed, watch, ref } from 'vue';
import { utils } from '@/utils';
import { SortType, TableParams } from './../types';

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

    let oldParams: Ref<TableParams | null> = ref(null);

    watch(
        params,
        () => {
            if (utils.object.isEqual(oldParams.value, params.value)) {
                return;
            }

            ctx.emit('update:params', params.value);
            oldParams.value = params.value;
        },
        { deep: true, immediate: true },
    );
}
