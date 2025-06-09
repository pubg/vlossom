import { Breakpoints } from '@/declaration';

export type InputValueType = File | File[] | null;

export interface VsFileDropStyleSet {
    height?: string | number | Breakpoints;
    width?: string | number | Breakpoints;
}
