import type { App } from 'vue';
import type { VlossomOptions } from '@/declaration/types';
import { Vlossom } from './vlossom';
import * as VsComponents from '@/components';

let vlossom: Vlossom;

export function createVlossom(options?: VlossomOptions) {
    return {
        install(app: App<Element>) {
            vlossom = new Vlossom(options);

            app.config.globalProperties.$vlossom = vlossom;

            Object.values(VsComponents).forEach((component) => {
                app.use(component);
            });
        },
    };
}

function getVlossom() {
    return vlossom;
}

export { getVlossom };
