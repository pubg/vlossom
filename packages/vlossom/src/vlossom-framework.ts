import { store } from './store';

import type { App } from 'vue';
import type { VlossomOptions, VsComponent } from '@/declaration';

export class Vlossom {
    constructor(options?: VlossomOptions) {
        const { colorScheme = {}, styleSet = {} } = options || {};
        store.setGlobalColorScheme(colorScheme);
        store.registerStyleSet(styleSet);
    }
}

let vlossom: Vlossom;

function registerComponents(app: App, components: VsComponent[] = []) {
    const modules: Record<string, any> = import.meta.glob('./components/**/*.vue', { eager: true });
    Object.values(modules).forEach((module) => {
        const component = module.default;
        if (components.length && !components.includes(component.name as VsComponent)) {
            return;
        }
        app.component(component.name, component);
    });
}

function createVlossom(options?: VlossomOptions) {
    return {
        install(app: App) {
            vlossom = new Vlossom(options);

            app.config.globalProperties.$vs = vlossom;

            registerComponents(app, options?.components);
        },
    };
}

function getVlossom() {
    return vlossom;
}

export { createVlossom, getVlossom };
