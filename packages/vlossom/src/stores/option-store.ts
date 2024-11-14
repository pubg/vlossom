import { reactive } from 'vue';
import { VsComponent } from '@/declaration';
import { utils } from '@/utils';

import type { GlobalColorScheme, StyleSet, VsNode } from '@/declaration';

interface OptionStoreState {
    theme: 'light' | 'dark';
    globalColorScheme: GlobalColorScheme;
    styleSets: StyleSet;
    globalRadiusRatio: number;
}

export class OptionStore {
    private state: OptionStoreState = reactive({
        theme: 'light',
        globalColorScheme: {},
        styleSets: {},
        globalRadiusRatio: 1,
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

    getGlobalColorScheme(component: VsComponent | VsNode) {
        return this.state.globalColorScheme[component] || this.state.globalColorScheme.default;
    }

    setGlobalRadiusRatio(radiusRatio: number) {
        if (isNaN(radiusRatio) || radiusRatio < 0 || radiusRatio > 1) {
            utils.log.error('VlossomOptions', 'The radius ratio must be between 0 and 1');
            return;
        }

        this.state.globalRadiusRatio = radiusRatio;
        document.documentElement.style.setProperty('--vs-radius-ratio', radiusRatio.toString());
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

    getStyleSet(component: VsComponent | VsNode, styleSetName: string) {
        return this.state.styleSets[component as keyof StyleSet]?.[styleSetName];
    }
}
