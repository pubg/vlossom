import { DialogStackStore } from './dialog-stack-store';
import { OptionStore } from './option-store';

export class VsStore {
    public dialogStack = new DialogStackStore();
    public option = new OptionStore();
}

export const store = new VsStore();
