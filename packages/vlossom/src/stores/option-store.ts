import { reactive } from 'vue';
import { VsComponent } from '@/declaration';

import type { GlobalColorScheme, StyleSet } from '@/declaration';

interface OptionStoreState {
    theme: 'light' | 'dark';
    globalColorScheme: GlobalColorScheme;
    styleSets: StyleSet;
    globalBorderRadius: string;
}

export class OptionStore {
    private state: OptionStoreState = reactive({
        theme: 'light',
        globalColorScheme: {},
        styleSets: {},
        globalBorderRadius: '0.4rem',
    });

    getState() {
        return this.state;
    }

    setTheme(theme: 'light' | 'dark') {
        this.state.theme = theme;
    }

    setGlobalColorScheme(colorScheme: GlobalColorScheme) {
        this.state.globalColorScheme = colorScheme;
    }

    getGlobalColorScheme(component: VsComponent) {
        return this.state.globalColorScheme[component] || this.state.globalColorScheme.default;
    }

    setGlobalBorderRadius(borderRadius: string = '0.4rem') {
        this.state.globalBorderRadius = borderRadius;

        document.documentElement.style.setProperty('--vs-border-radius', borderRadius);
    }

    registerStyleSet(styleSet: StyleSet) {
        Object.entries(styleSet).forEach(([key, value]) => {
            const styleSets = this.state.styleSets[key as keyof StyleSet];

            if (!styleSets) {
                this.state.styleSets[key as keyof StyleSet] = value;
            } else {
                Object.assign(styleSets, value);
            }
        });
    }

    getStyleSet(component: VsComponent, styleSetName: string) {
        return this.state.styleSets[component as keyof StyleSet]?.[styleSetName];
    }
}
