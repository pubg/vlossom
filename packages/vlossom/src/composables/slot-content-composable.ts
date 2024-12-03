import { h, toRaw } from 'vue';
import { VsSlotRenderer } from '@/nodes';

export function useSlotContent() {
    function getSlotContent(content: any) {
        if (typeof content === 'string') {
            return h(VsSlotRenderer, { content });
        }

        // vue component
        return toRaw(content);
    }

    return { getSlotContent };
}
