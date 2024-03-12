import { OptionStore } from './option-store';
import { DialogStore } from './dialog-store';
import { ToastStore } from './toast-store';
import { ConfirmStore } from './confirm-store';

export class VsStore {
    public option = new OptionStore();
    private _dialog: DialogStore | null = null;
    private _toast: ToastStore | null = null;
    private _confirm: ConfirmStore | null = null;

    public get dialog() {
        if (!this._dialog) {
            this._dialog = new DialogStore();
        }
        return this._dialog;
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
