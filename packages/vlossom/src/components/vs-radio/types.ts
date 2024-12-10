export interface VsRadioNodeStyleSet {
    borderRadius?: string;
    height?: string;
    labelFontColor?: string;
    labelFontSize?: string;
    radioColor?: string;
    radioSize?: string;
    selectedLabelFontColor?: string;
}

export interface VsRadioStyleSet extends VsRadioNodeStyleSet {}

export interface VsRadioSetStyleSet extends VsRadioNodeStyleSet {
    radioGap?: string;
    flexWrap?: string;
}
