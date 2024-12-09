import { ModalOptions } from '@/declaration';

export interface VsModalStyleSet {
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
    fontColor?: string;
    fontSize?: string;
    fontWeight?: string | number;
    height?: string;
    width?: string;
    padding?: string;
    zIndex?: string | number;
}

export type VsModalOptions = ModalOptions<VsModalStyleSet>;
