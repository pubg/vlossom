import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export interface GlobalColorScheme {
    default?: ColorScheme;
    vsButton?: ColorScheme;
    vsInput?: ColorScheme;
    vsSection?: ColorScheme;
}

export interface StyleSet {
    vsButton?: { [key: string]: VsButtonStyleSet };
    vsInput?: { [key: string]: VsInputStyleSet };
    vsSection?: { [key: string]: VsSectionStyleSet };
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
