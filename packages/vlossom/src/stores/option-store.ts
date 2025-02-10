import { readonly, Ref, ref } from 'vue';
import { VsComponent } from '@/declaration';
import { utils } from '@/utils';

import type { GlobalColorScheme, StyleSet } from '@/declaration';

interface OptionStoreState {
    theme: 'light' | 'dark';
    globalColorScheme: GlobalColorScheme;
    styleSets: StyleSet;
    globalRadiusRatio: number;
}

export class OptionStore {
    private _options: Ref<OptionStoreState> = ref({
        theme: 'light',
        globalColorScheme: {},
        styleSets: {},
        globalRadiusRatio: 1,
    });
    public options = readonly(this._options);

    getOptions() {
        return this._options.value;
    }

    setTheme(theme: 'light' | 'dark') {
        this._options.value.theme = theme;
    }

    setGlobalColorScheme(colorScheme: GlobalColorScheme) {
        this._options.value.globalColorScheme = colorScheme;
    }

    getGlobalColorScheme(component: VsComponent | string) {
        return this._options.value.globalColorScheme[component] || this._options.value.globalColorScheme.default;
    }

    setGlobalRadiusRatio(radiusRatio: number) {
        if (isNaN(radiusRatio) || radiusRatio < 0 || radiusRatio > 1) {
            utils.log.error('VlossomOptions', 'The radius ratio must be between 0 and 1');
            return;
        }

        this._options.value.globalRadiusRatio = radiusRatio;
        document.documentElement.style.setProperty('--vs-radius-ratio', radiusRatio.toString());
    }

    registerStyleSet(styleSet: StyleSet) {
        Object.entries(styleSet).forEach(([key, value]) => {
            const styleSets = this._options.value.styleSets[key as keyof StyleSet];

            if (!styleSets) {
                this._options.value.styleSets[key as keyof StyleSet] = value;
            } else {
                Object.assign(styleSets, value);
            }
        });
    }

    getStyleSet(component: VsComponent | string, styleSetName: string) {
        return this._options.value.styleSets[component as keyof StyleSet]?.[styleSetName];
    }
}
