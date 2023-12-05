import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export enum VsComponent {
    VsButton = 'VsButton',
    VsInput = 'VsInput',
    VsSection = 'VsSection',
}

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export type GlobalColorScheme = { default?: ColorScheme } & { [key in VsComponent]?: ColorScheme };

export interface StyleSet {
    VsButton?: { [key: string]: VsButtonStyleSet };
    VsInput?: { [key: string]: VsInputStyleSet };
    VsSection?: { [key: string]: VsSectionStyleSet };
}

export interface VlossomOptions {
    colorScheme?: GlobalColorScheme;
    styleSet?: StyleSet;
}

export interface Breakpoints {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}
