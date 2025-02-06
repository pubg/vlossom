import type { ModalOptions } from '@/declaration';
import type { VsButtonStyleSet } from '..';

export interface VsConfirmStyleSet {
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    cancelButton?: VsButtonStyleSet;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    height?: string;
    okButton?: VsButtonStyleSet;
    padding?: string;
    width?: string;
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
