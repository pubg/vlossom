import { DialogStore } from './dialog-store';
import { OptionStore } from './option-store';
import { ToastStore } from './toast-store';

export class VsStore {
    public dialog = new DialogStore();
    public option = new OptionStore();
    public _toastStore: ToastStore | null = null;

    public get toastStore() {
        if (!this._toastStore) {
            this._toastStore = new ToastStore();
        }
        return this._toastStore;
    }
}

export const store = new VsStore();
