import { DialogStore } from './dialog-store';
import { OptionStore } from './option-store';
import { SnackbarsStore } from './snackbar-store';

export class VsStore {
    public dialog = new DialogStore();
    public option = new OptionStore();
    public _snackbar: SnackbarsStore | null = null;

    public get snackbar() {
        if (!this._snackbar) {
            console.log(1111111, 'created snackbar!');
            this._snackbar = new SnackbarsStore();
        }
        return this._snackbar;
    }
}

export const store = new VsStore();
