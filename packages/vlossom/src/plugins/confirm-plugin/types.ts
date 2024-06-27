import type { ColorScheme, SizeProp } from '@/declaration';
import { type VsModalStyleSet } from '@/components/vs-modal/types';

export interface ConfirmOptions {
    colorScheme?: ColorScheme;
    styleSet?: string | VsModalStyleSet;
    closeOnDimmedClick?: boolean;
    closeOnEsc?: boolean;
    dimmed?: boolean;
    focusLock?: boolean;
    hasContainer?: boolean;
    hideScroll?: boolean;
    initialFocusRef?: HTMLElement | null;
    size?: SizeProp | { width?: SizeProp; height?: SizeProp };

    okText?: string;
    cancelText?: string;
}

export interface ConfirmPlugin {
    open: (text: string, confirmOptions?: ConfirmOptions) => Promise<boolean>;
    prompt: (text: string, confirmText: string) => Promise<boolean>;
}
