import { ConfirmStore } from './confirm-store';
import { EscStackStore } from './esc-stack-store';
import { OptionStore } from './option-store';
import { ToastStore } from './toast-store';

export class VsStore {
    private _confirm: ConfirmStore | null = null;
    private _escStack: EscStackStore | null = null;
    private _option: OptionStore | null = null;
    private _toast: ToastStore | null = null;

    public get option() {
        if (!this._option) {
            this._option = new OptionStore();
        }
        return this._option;
    }
    public get escStack() {
        if (!this._escStack) {
            this._escStack = new EscStackStore();
        }
        return this._escStack;
    }

    public get toast() {
        if (!this._toast) {
            this._toast = new ToastStore();
        }
        return this._toast;
    }

    public get confirm() {
        if (!this._confirm) {
            this._confirm = new ConfirmStore();
        }
        return this._confirm;
    }
}

export const store = new VsStore();
