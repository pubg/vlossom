import { PropType } from 'vue';
import { ColorScheme, OverlayCallbacks } from '@/declaration';

export function getOverlayProps<T>() {
    return {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | T> },
        callbacks: {
            type: Object as PropType<OverlayCallbacks>,
            default: () => ({}),
        },
        dimClose: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        escClose: { type: Boolean, default: true },
        focusLock: { type: Boolean, default: true },
        id: { type: String, default: '' },
        initialFocusRef: {
            type: Object as PropType<HTMLElement | null>,
            default: null,
        },
    };
}
