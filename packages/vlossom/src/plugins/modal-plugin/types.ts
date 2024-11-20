import { ModalCallbacks } from '@/declaration';

export interface ModalOptions {
    component: any;
    header?: any;
    footer?: any;
    container?: HTMLElement;
    callbacks?: ModalCallbacks;
    // sync with getModalProps function
    dimClose?: boolean;
    dimmed?: boolean;
    escClose?: boolean;
    focusLock?: boolean;
    hasContainer?: boolean;
    hideScroll?: boolean;
    id?: string;
    initialFocusRef?: HTMLElement | null;
    size?: string | number | { width?: string | number; height?: string | number };
}

export interface ModalPlugin {
    open(options: ModalOptions): void | Promise<void>;
    emit(event: string, ...args: any[]): void | Promise<void>;
    emitWithId(id: string, event: string, ...args: any[]): void | Promise<void>;
    close(...args: any[]): void | Promise<void>;
    closeWithId(id: string, ...args: any[]): void | Promise<void>;
    clear(...args: any[]): void | Promise<void>;
}
