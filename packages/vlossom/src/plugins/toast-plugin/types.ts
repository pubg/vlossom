import type { Align, ColorScheme, Placement } from '@/declaration';
import type { VsToastStyleSet } from '@/components/vs-toast/types';

export interface ToastOptions {
    align?: Align;
    autoClose?: boolean;
    colorScheme?: ColorScheme;
    placement?: Exclude<Placement, 'left' | 'right'>;
    primary?: boolean;
    styleSet?: string | VsToastStyleSet;
    timeout?: number;
}

export interface ToastInfo extends ToastOptions {
    id: string;
    content: string;
}

export interface ToastPlugin {
    show(content: string, toastOptions?: ToastOptions): void;
    success(content: string, toastOptions?: ToastOptions): void;
    info(content: string, toastOptions?: ToastOptions): void;
    error(content: string | Error, toastOptions?: ToastOptions): void;
    warn(content: string, toastOptions?: ToastOptions): void;
}
