export type InputValueType = string | number | null;

export type InputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

export interface VsInputStyleSet {
    appendBackgroundColor?: string;
    appendColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
    padding?: string;
    prependBackgroundColor?: string;
    prependColor?: string;
}
