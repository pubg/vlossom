import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export interface StyleSet {
    vsButton?: VsButtonStyleSet;
    vsInput?: VsInputStyleSet;
    vsSection?: VsSectionStyleSet;
}

export interface StyleSets {
    [key: string]: StyleSet;
}

export interface VlossomOptions {
    styleSets: StyleSets;
}
