import type { App } from 'vue';
import type { VlossomOptions } from '@/declaration/types';

import { registerStyleSets } from '@/composables/customStyle';

export function createVlossom(options: VlossomOptions) {
    const { styleSets = {} } = options;

    return {
        install(app: App) {
            registerStyleSets(styleSets);

            // TODO: register components ...
            app.config.globalProperties.$vlossom = 'vlossom';
        },
    };
}
