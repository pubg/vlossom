import type { App } from 'vue';
import type { VlossomOptions } from '@/declaration/types';
import { setGlobalColorScheme, registerStyleSet } from '@/composables';
import * as VsComponents from '@/components';

export function createVlossom(options?: VlossomOptions) {
    const { colorScheme = {}, styleSet = {} } = options || {};
    // TODO: VlossomFramework 클래스 생성

    return {
        install(app: App<Element>) {
            setGlobalColorScheme(colorScheme);
            registerStyleSet(styleSet);

            app.config.globalProperties.$vlossom = 'vlossom';

            Object.values(VsComponents).forEach((component) => {
                app.use(component);
            });
        },
    };
}
