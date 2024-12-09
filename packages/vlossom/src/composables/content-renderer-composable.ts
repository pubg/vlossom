import { Component, h, toRaw } from 'vue';
import { VsContentRenderer } from '@/nodes';

export function useContentRenderer() {
    function getRenderedContent(content: string | Component) {
        if (typeof content === 'string') {
            return h(VsContentRenderer, { content });
        }

        // vue component
        return toRaw(content);
    }

    return { getRenderedContent };
}
