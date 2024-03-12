import { Ref } from 'vue';

export default function useTableExpand(expandable: Ref<boolean>, expandedIds: Ref<string[]>) {
    function getExpandedIndex(id: string): number {
        return expandedIds.value.findIndex((expandedId) => expandedId === id);
    }

    function isExpanded(id: string): boolean {
        return getExpandedIndex(id) > -1;
    }

    function toggleExpand(id: string) {
        if (!expandable.value) {
            return;
        }

        const expandedIndex = getExpandedIndex(id);

        if (expandedIndex > -1) {
            expandedIds.value.splice(expandedIndex, 1);
        } else {
            expandedIds.value.push(id);
        }
    }

    return {
        expandedIds,
        isExpanded,
        toggleExpand,
    };
}
