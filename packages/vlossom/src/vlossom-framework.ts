import { store } from './store';
import { shallowReactive, type App } from 'vue';

import type { VlossomOptions, VsComponent } from '@/declaration';

interface VlossomState {
    theme: 'light' | 'dark';
}

export class Vlossom {
    private _state = shallowReactive<VlossomState>({
        theme: 'light',
    });

    constructor(options?: VlossomOptions) {
        const { colorScheme = {}, styleSet = {}, theme = 'light' } = options || {};

        store.setGlobalColorScheme(colorScheme);
        store.registerStyleSet(styleSet);

        this.theme = (this.getDefaultTheme(options) as 'light' | 'dark') || theme;
    }

    private getDefaultTheme(options?: VlossomOptions) {
        const savedTheme = localStorage.getItem('vlossom:theme');
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        if (savedTheme) {
            return savedTheme;
        } else if (options?.detectOSTheme && mediaQueryList.matches) {
            return 'dark';
        }

        return '';
    }

    get theme() {
        return this._state.theme;
    }

    set theme(value) {
        this._state.theme = value;
        localStorage.setItem('vlossom:theme', value);
        document.body.classList.toggle('vs-dark', value === 'dark');
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
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
    return vlossom;
}

export { createVlossom, useVlossom };
