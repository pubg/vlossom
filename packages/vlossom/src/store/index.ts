import { DialogStore } from './dialog-store';
import { OptionStore } from './option-store';

export class VsStore {
    public dialog = new DialogStore();
    public option = new OptionStore();
}

export const store = new VsStore();
