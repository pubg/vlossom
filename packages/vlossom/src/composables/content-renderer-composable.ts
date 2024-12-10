import { Component, h } from 'vue';
import { VsContentRenderer } from '@/components';

export function useContentRenderer() {
    function getRenderedContent(content: string | Component) {
        return h(VsContentRenderer, { content });
    }

    return { getRenderedContent };
}
