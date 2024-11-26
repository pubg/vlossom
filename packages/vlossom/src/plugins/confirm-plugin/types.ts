import type { ConfirmOptions } from '@/declaration';

export interface ConfirmPlugin {
    open: (text: string, confirmOptions?: ConfirmOptions) => Promise<boolean>;
    prompt: (text: string, confirmText: string) => Promise<boolean>;
}
