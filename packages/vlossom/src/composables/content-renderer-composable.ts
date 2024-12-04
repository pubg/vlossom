import { h, toRaw } from 'vue';
import { VsContentRenderer } from '@/nodes';

export function useContentRenderer() {
    function getRenderedContent(content: any) {
        if (typeof content === 'string') {
            return h(VsContentRenderer, { content });
        }

        // vue component
        return toRaw(content);
    }

    return { getRenderedContent };
}
