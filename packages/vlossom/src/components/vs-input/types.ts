import { InputRef } from '@/declaration';

export type InputValueType = string | number | null;

export type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

export interface VsInputRef extends InputRef {
    select: () => void;
}

export interface VsAttachmentStyleSet {
    backgroundColor?: string;
    fontColor?: string;
}

export interface VsInputStyleSet {
    append?: VsAttachmentStyleSet;
    appendBackgroundColor?: string;
    appendColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
    padding?: string;
    prepend?: VsAttachmentStyleSet;
}
