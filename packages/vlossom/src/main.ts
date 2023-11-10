import type { App } from 'vue';
import type { VlossomOptions } from '@/declaration/types';

import { setGlobalColorScheme } from './composables/colorScheme';
import { registerStyleSet } from '@/composables/customStyle';

export function createVlossom(options: VlossomOptions) {
    const { colorScheme = {}, styleSet = {} } = options;

    return {
        install(app: App) {
            setGlobalColorScheme(colorScheme);
            registerStyleSet(styleSet);

            // TODO: register components ...
            app.config.globalProperties.$vlossom = 'vlossom';
        },
    };
}
