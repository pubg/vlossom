import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export type ColorScheme = 'idle' | 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

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
