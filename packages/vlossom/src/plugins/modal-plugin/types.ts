import { VsModalOptions } from '@/components';

export interface ModalPlugin {
    open(options: VsModalOptions): string;
    emit(event: string, ...args: any[]): void | Promise<void>;
    emitWithId(id: string, event: string, ...args: any[]): void | Promise<void>;
    close(...args: any[]): void | Promise<void>;
    closeWithId(id: string, ...args: any[]): void | Promise<void>;
    clear(...args: any[]): void | Promise<void>;
}
