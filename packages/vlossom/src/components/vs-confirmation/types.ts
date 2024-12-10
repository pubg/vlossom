import type { ModalOptions } from '@/declaration';

export interface VsConfirmationStyleSet {
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
    // TODO: add button style object (224926)
}

export interface ConfirmOptions extends Omit<ModalOptions<VsConfirmationStyleSet>, 'component'> {
    okText?: string;
    cancelText?: string;
}

export interface PromptOptions extends ConfirmOptions {
    inputType?: string;
    inputLabel?: string;
    inputMaxLength?: number;
    inputPlaceholder?: string;
}
