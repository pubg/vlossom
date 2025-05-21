import { VsBoxStyleSet, VsFlexStyleSet } from '@/declaration';

export interface VsLabelValueStyleSet {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    cell?: VsFlexStyleSet;
    label: VsBoxStyleSet & { width?: string };
    padding?: string;
}
