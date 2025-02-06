export interface VsSelectOptionStyleSet {
    backgroundColor: string;
    fontColor: string;
}

export interface VsSelectOptionsStyleSet {
    maxHeight?: string;
    zIndex?: string | number;
}

export interface VsSelectStyleSet {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
    optionHover?: VsSelectOptionStyleSet;
    optionSelected?: VsSelectOptionStyleSet;
    options?: VsSelectOptionsStyleSet;
    padding?: string;
}
