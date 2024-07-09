export type InputValueType = string | number | null;

export enum InputType {
    Email = 'email',
    Number = 'number',
    Password = 'password',
    Search = 'search',
    Tel = 'tel',
    Text = 'text',
    Url = 'url',
}

export interface VsInputStyleSet {
    appendBackgroundColor?: string;
    appendColor?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
    prependBackgroundColor?: string;
    prependColor?: string;
}
