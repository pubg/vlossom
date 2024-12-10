export interface VsCheckboxNodeStyleSet {
    borderRadius?: string;
    checkboxColor?: string;
    checkboxSize?: string;
    height?: string;
    labelFontColor?: string;
    labelFontSize?: string;
    selectedLabelFontColor?: string;
}

export interface VsCheckboxStyleSet extends VsCheckboxNodeStyleSet {}

export interface VsCheckboxSetStyleSet extends VsCheckboxNodeStyleSet {
    checkboxGap?: string;
    flexWrap?: string;
}
