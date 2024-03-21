export interface VsTabsStyleSet {
    backgroundColor?: string;
    borderBottomColor?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    gap?: string;
    height?: string;
    padding?: string;
    tabWidth?: string;
}

export const SCROLL_BUTTONS = [true, false, 'auto'] as const;

export type ScrollButton = (typeof SCROLL_BUTTONS)[number];

export type ScrollLogicalPosition = 'center' | 'end' | 'nearest' | 'start';
