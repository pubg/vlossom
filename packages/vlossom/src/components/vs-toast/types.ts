import { ToastInfo, ToastOptions } from '@/declaration';

export interface VsToastStyleSet {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
}

export type VsToastOptions = ToastOptions<VsToastStyleSet>;

export type VsToastInfo = ToastInfo<VsToastStyleSet>;
