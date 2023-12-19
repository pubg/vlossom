import type { GlobalColorScheme, StyleSet, VlossomStore } from '@/declaration/types';
import { reactive } from 'vue';

export class VsStore {
    private store: VlossomStore = reactive({
        globalColorScheme: {},
        styleSets: {},
    });

    getStore() {
        return this.store;
    }

    setGlobalColorScheme(colorScheme: GlobalColorScheme) {
        this.store.globalColorScheme = colorScheme;
    }

    registerStyleSet(styleSet: StyleSet) {
        Object.entries(styleSet).forEach(([key, value]) => {
            const styleSets = this.store.styleSets[key as keyof StyleSet];

            if (!styleSets) {
                this.store.styleSets[key as keyof StyleSet] = value;
            } else {
                Object.assign(styleSets, value);
            }
        });
    }
}

export const store = new VsStore();
