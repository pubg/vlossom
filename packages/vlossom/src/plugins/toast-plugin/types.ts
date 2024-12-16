import { Component } from 'vue';
import type { VsToastOptions } from '@/components/vs-toast/types';

export interface ToastPlugin {
    show(content: string | Component, options?: Omit<VsToastOptions, 'logger'>): void;
    success(content: string | Component, options?: Omit<VsToastOptions, 'logger'>): void;
    info(content: string | Component, options?: Omit<VsToastOptions, 'logger'>): void;
    warn(content: string | Component, options?: VsToastOptions): void;
    error(content: string | Component | Error, options?: VsToastOptions): void;
}
