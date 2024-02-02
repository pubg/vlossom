import { store } from './store';
import { reactive, type App } from 'vue';

import type { VlossomOptions, VsComponent } from '@/declaration';

export class Vlossom {
    private _theme: 'light' | 'dark';

    constructor(options?: VlossomOptions) {
        const { colorScheme = {}, styleSet = {}, theme = 'light' } = options || {};

        store.setGlobalColorScheme(colorScheme);
        store.registerStyleSet(styleSet);

        this._theme = theme;
    }

    get theme() {
        return this._theme;
    }

    set theme(value) {
        this._theme = value;

        localStorage.setItem('vlossom:theme', value);

        document.body.classList.toggle('vs-dark', value === 'dark');
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

function useVlossom() {
    return reactive(vlossom);
}

export { createVlossom, useVlossom };
