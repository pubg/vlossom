import type { ModalOptions } from '@/declaration';
import type { VsButtonStyleSet } from '..';

export interface VsConfirmStyleSet {
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    button?: VsButtonStyleSet;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    height?: string;
    width?: string;
    padding?: string;
    zIndex?: string | number;
}

export interface ConfirmOptions extends Omit<ModalOptions<VsConfirmStyleSet>, 'component'> {
    okText?: string;
    cancelText?: string;
}

export interface PromptOptions extends ConfirmOptions {
    inputType?: string;
    inputLabel?: string;
    inputMaxLength?: number;
    inputPlaceholder?: string;
}
