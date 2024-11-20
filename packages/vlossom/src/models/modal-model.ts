import { PropType } from 'vue';
import { ColorScheme, SizeProp } from '@/declaration';
import { utils } from '@/utils';

// sync with ModalOptions interface
export function getModalProps<T = any, S = PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>>(
    defaultValues: Record<string, any> = {},
) {
    const modalProps = {
        colorScheme: { type: String as PropType<ColorScheme> },
        styleSet: { type: [String, Object] as PropType<string | T> },
        dimClose: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        escClose: { type: Boolean, default: true },
        focusLock: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        id: { type: String, default: '' },
        initialFocusRef: {
            type: Object as PropType<HTMLElement | null>,
            default: null,
        },
        size: {
            type: [String, Number, Object] as S,
            default: 'md',
        },
    };

    return utils.props.mergePropsDefault(modalProps, defaultValues);
}
