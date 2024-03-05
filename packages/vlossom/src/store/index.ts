import { DialogStore } from './dialog-store';
import { OptionStore } from './option-store';
import { ToastStore } from './toast-store';

export class VsStore {
    public dialog = new DialogStore();
    public option = new OptionStore();
    public _toast: ToastStore | null = null;

    public get toast() {
        if (!this._toast) {
            console.log(1111111, 'created toast!');
            this._toast = new ToastStore();
        }
        return this._toast;
    }
}

export const store = new VsStore();
