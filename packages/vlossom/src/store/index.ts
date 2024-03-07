import { OptionStore } from './option-store';

export class VsStore {
    public option = new OptionStore();
}

export const store = new VsStore();
