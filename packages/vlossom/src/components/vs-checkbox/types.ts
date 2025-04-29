import { VsTextStyleSet } from '@/declaration';

export interface VsCheckboxNodeStyleSet {
    borderWidth?: string;
    borderRadius?: string;
    checkboxColor?: string;
    checkboxSize?: string;
    height?: string;
    label?: VsTextStyleSet;
    checkedLabel?: VsTextStyleSet;
}

export interface VsCheckboxStyleSet extends VsCheckboxNodeStyleSet {
    indeterminateLabel?: VsTextStyleSet;
}

export interface VsCheckboxSetStyleSet extends VsCheckboxNodeStyleSet {
    gap?: string;
    flexWrap?: string;
}
