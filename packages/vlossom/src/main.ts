import type { App } from 'vue';
import type { VlossomOptions } from '@/declaration/types';

import { registerStyleSet } from '@/composables/customStyle';

export function createVlossom(options: VlossomOptions) {
    const { styleSet = {} } = options;

    return {
        install(app: App) {
            registerStyleSet(styleSet);

            // TODO: register components ...
            app.config.globalProperties.$vlossom = 'vlossom';
        },
    };
}
