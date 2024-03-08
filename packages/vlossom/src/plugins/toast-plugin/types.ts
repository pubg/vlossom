import { UIState } from '@/declaration';
import type { Align, ColorScheme, Placement } from '@/declaration';

export interface ToastOptions {
    autoClose?: boolean;
    timeout?: number;
    placement?: Exclude<Placement, 'left' | 'right'>;
    align?: Align;
    colorScheme?: ColorScheme;
}

export interface ToastInfo {
    id: string;
    text: string;
    autoClose: boolean;
    duration?: number;
    placement: Exclude<Placement, 'left' | 'right'>;
    align: Align;
    colorScheme?: ColorScheme;
    state?: Exclude<UIState, UIState.Idle | UIState.Selected>;
}

export interface ToastPlugin {
    show(text: string, toastOptions?: ToastOptions): void;
    success(text: string, toastOptions?: ToastOptions): void;
    info(text: string, toastOptions?: ToastOptions): void;
    error(text: any, toastOptions?: ToastOptions): void;
    warn(text: any, toastOptions?: ToastOptions): void;
}
