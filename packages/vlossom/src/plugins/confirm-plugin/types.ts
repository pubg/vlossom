import type { ConfirmOptions, PromptOptions } from '@/nodes';

export interface ConfirmPlugin {
    open: (content: string, confirmOptions?: ConfirmOptions) => Promise<boolean>;
    prompt: (content: string, confirmText: string, promptOptions?: PromptOptions) => Promise<boolean>;
}
