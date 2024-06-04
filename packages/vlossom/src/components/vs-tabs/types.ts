export interface VsTabsStyleSet {
    backgroundColor?: string;
    borderBottomColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    gap?: string;
    height?: string;
    padding?: string;
    selectedFontColor?: string;
    tabWidth?: string;
}

export const SCROLL_BUTTONS = ['show', 'hide', 'auto'] as const;

export type ScrollButton = (typeof SCROLL_BUTTONS)[number];
