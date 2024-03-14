import { Ref, ref } from 'vue';

export default function useTableExpand(expandable: Ref<boolean>) {
    const expandedIds: Ref<string[]> = ref([]);

    function toggleExpand(id: string) {
        if (!expandable.value) {
            return;
        }

        const expandedIndex = expandedIds.value.findIndex((expandedId) => expandedId === id);

        if (expandedIndex > -1) {
            expandedIds.value.splice(expandedIndex, 1);
        } else {
            expandedIds.value.push(id);
        }
    }

    return {
        expandedIds,
        toggleExpand,
    };
}
