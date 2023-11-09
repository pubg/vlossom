import type { VsButtonStyleSet, VsInputStyleSet, VsSectionStyleSet } from '@/components';

export type ColorScheme = 'red' | 'amber' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink';

export interface StyleSet {
    vsButton?: { [key: string]: VsButtonStyleSet };
    vsInput?: { [key: string]: VsInputStyleSet };
    vsSection?: { [key: string]: VsSectionStyleSet };
}

export interface VlossomOptions {
    styleSet?: StyleSet;
}
