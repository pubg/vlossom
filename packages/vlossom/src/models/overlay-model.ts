import { PropType } from 'vue';
import { ColorScheme } from '@/declaration';

// sync with ModalOptions interface
export function getOverlayProps<T>() {
    return {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | T> },
        dimClose: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        escClose: { type: Boolean, default: true },
        fixed: { type: Boolean, default: false },
        focusLock: { type: Boolean, default: true },
        hideScroll: { type: Boolean, default: false },
        id: { type: String, default: '' },
        initialFocusRef: {
            type: Object as PropType<HTMLElement | null>,
            default: null,
        },
    };
}
