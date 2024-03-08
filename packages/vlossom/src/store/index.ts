import { DialogStore } from './dialog-store';
import { OptionStore } from './option-store';
import { ToastStore } from './toast-store';

export class VsStore {
    public option = new OptionStore();
    private _dialog: DialogStore | null = null;
    private _toast: ToastStore | null = null;

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
}

export const store = new VsStore();
