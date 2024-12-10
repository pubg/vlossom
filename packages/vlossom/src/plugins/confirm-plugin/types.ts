import { Component } from 'vue';
import type { ConfirmOptions, PromptOptions } from '@/components';

export interface ConfirmPlugin {
    open: (content: string | Component, confirmOptions?: ConfirmOptions) => Promise<boolean>;
    prompt: (content: string, confirmText: string, promptOptions?: PromptOptions) => Promise<boolean>;
}
