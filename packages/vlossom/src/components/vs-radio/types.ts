import { VsTextStyleSet } from '@/declaration';

export interface VsRadioNodeStyleSet {
    borderRadius?: string;
    height?: string;
    label?: VsTextStyleSet;
    checkedLabel?: VsTextStyleSet;
    radioColor?: string;
    radioSize?: string;
}

export interface VsRadioStyleSet extends VsRadioNodeStyleSet {}

export interface VsRadioSetStyleSet extends VsRadioNodeStyleSet {
    gap?: string;
    flexWrap?: string;
}
