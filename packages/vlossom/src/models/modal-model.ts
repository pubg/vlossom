import { PropType } from 'vue';
import { SizeProp } from '@/declaration';

export function getModalProps(defaultValues: Record<string, any> = {}) {
    const modalProps = {
        closeOnDimmedClick: { type: Boolean, default: true },
        closeOnEsc: { type: Boolean, default: true },
        dimmed: { type: Boolean, default: true },
        focusLock: { type: Boolean, default: true },
        hasContainer: { type: Boolean, default: false },
        hideScroll: { type: Boolean, default: false },
        initialFocusRef: { type: [Object, undefined] as PropType<HTMLElement | null>, default: null },
        size: {
            type: [String, Number, Object] as PropType<SizeProp | { width?: SizeProp; height?: SizeProp }>,
            default: 'md',
        },
    };

    Object.keys(defaultValues).forEach((key) => {
        const propName = key as keyof typeof modalProps;
        if (modalProps[propName]) {
            modalProps[propName].default = defaultValues[key];
        }
    });

    return modalProps;
}
