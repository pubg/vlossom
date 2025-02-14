import { Component, h } from 'vue';
import { VsContentRenderer } from '@/components';

export function useContentRenderer() {
    function getRenderedContent(content: string | Component, props: Record<string, any> = {}) {
        return h(VsContentRenderer, { content, ...props });
    }

    return { getRenderedContent };
}
