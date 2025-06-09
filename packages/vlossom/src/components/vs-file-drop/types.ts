import { Breakpoints, VsBoxStyleSet, VsFlexStyleSet } from '@/declaration';

export type InputValueType = File | File[] | null;

export interface VsFileDropStyleSet extends VsBoxStyleSet, VsFlexStyleSet {
    height?: string | number | Breakpoints;
    width?: string | number | Breakpoints;
    border?: string;
    borderRadius?: string;
    dragBackgroundColor?: string;
}
