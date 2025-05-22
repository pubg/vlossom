import { VsBoxStyleSet, VsFlexStyleSet } from '@/declaration';

export interface VsLabelValueStyleSet {
    border?: string;
    borderRadius?: string;
    label?: VsBoxStyleSet & VsFlexStyleSet & { width?: string };
    content?: VsBoxStyleSet & VsFlexStyleSet & { width?: string };
    actions?: VsBoxStyleSet & VsFlexStyleSet & { width?: string };
}
