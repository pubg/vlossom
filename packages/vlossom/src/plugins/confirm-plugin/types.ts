import type { ColorScheme, Size } from '@/declaration';

export interface ConfirmOptions {
    okText?: string;
    cancelText?: string;
    colorScheme?: ColorScheme;
    size?: Size | string;
}

export interface ConfirmInfo extends ConfirmOptions {
    text: string;
}

export interface ConfirmPlugin {
    open: (text: string, confirmOptions?: ConfirmOptions) => Promise<boolean>;
    prompt: (text: string, confirmText: string) => Promise<boolean>;
}
