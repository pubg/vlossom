import { ColorScheme, OverlayCallbacks } from '@/declaration';

export interface VsModalNodeStyleSet {
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    height?: string;
    width?: string;
    padding?: string;
    zIndex?: string | number;
}

export interface ModalOptions {
    component: any;
    header?: any;
    footer?: any;
    container?: string;
    callbacks?: OverlayCallbacks;
    // sync with getOverlayProps function
    colorScheme?: ColorScheme;
    styleSet?: string | VsModalNodeStyleSet;
    dimClose?: boolean;
    dimmed?: boolean;
    escClose?: boolean;
    fixed?: boolean;
    focusLock?: boolean;
    hideScroll?: boolean;
    id?: string;
    initialFocusRef?: HTMLElement | null;
    size?: string | number | { width?: string | number; height?: string | number };
}
