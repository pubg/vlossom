import { VlossomOptions } from './declaration/types';
import { store } from './store';

export class Vlossom {
    constructor(options?: VlossomOptions) {
        const { colorScheme = {}, styleSet = {} } = options || {};
        store.setGlobalColorScheme(colorScheme);
        store.registerStyleSet(styleSet);
    }
}
