import { InputRef } from '@/declaration';

export type InputValueType = string;

export interface VsTextareaRef extends InputRef {
    select: () => void;
}
export interface VsTextareaStyleSet {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
    padding?: string;
    resize?: string;
}
