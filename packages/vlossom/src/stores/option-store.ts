import { Ref, ref } from 'vue';
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
    public options: Ref<OptionStoreState> = ref({
        theme: 'light',
        globalColorScheme: {},
        styleSets: {},
        globalRadiusRatio: 1,
    });

    getOptions() {
        return this.options.value;
    }

    setTheme(theme: 'light' | 'dark') {
        this.options.value.theme = theme;
    }

    setGlobalColorScheme(colorScheme: GlobalColorScheme) {
        this.options.value.globalColorScheme = colorScheme;
    }

    getGlobalColorScheme(component: VsComponent | string) {
        return this.options.value.globalColorScheme[component] || this.options.value.globalColorScheme.default;
    }

    setGlobalRadiusRatio(radiusRatio: number) {
        if (isNaN(radiusRatio) || radiusRatio < 0 || radiusRatio > 1) {
            utils.log.error('VlossomOptions', 'The radius ratio must be between 0 and 1');
            return;
        }

        this.options.value.globalRadiusRatio = radiusRatio;
        document.documentElement.style.setProperty('--vs-radius-ratio', radiusRatio.toString());
    }

    registerStyleSet(styleSet: StyleSet) {
        Object.entries(styleSet).forEach(([key, value]) => {
            const styleSets = this.options.value.styleSets[key as keyof StyleSet];

            if (!styleSets) {
                this.options.value.styleSets[key as keyof StyleSet] = value;
            } else {
                Object.assign(styleSets, value);
            }
        });
    }

    getStyleSet(component: VsComponent | string, styleSetName: string) {
        return this.options.value.styleSets[component as keyof StyleSet]?.[styleSetName];
    }
}
