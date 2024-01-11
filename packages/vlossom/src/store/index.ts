import { reactive } from 'vue';

import type { GlobalColorScheme, StyleSet, VlossomStore, VsComponent } from '@/declaration';

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

    getGlobalColorScheme(component: VsComponent) {
        return this.store.globalColorScheme[component] || this.store.globalColorScheme.default;
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

    getStyleSet(component: VsComponent, styleSetName: string) {
        return this.store.styleSets[component as keyof StyleSet]?.[styleSetName];
    }
}

export const store = new VsStore();
