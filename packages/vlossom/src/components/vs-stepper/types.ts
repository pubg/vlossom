import { VsTextStyleSet } from '@/declaration';

export interface VsStepStyleSet {}

export interface VsStepperStyleSet {
    activeColor?: string;
    activeBackgroundColor?: string;
    fontSize?: string;
    stepSize?: string;
    label?: VsTextStyleSet;
    pastLabel?: VsTextStyleSet;
    selectedLabel?: VsTextStyleSet;
}
