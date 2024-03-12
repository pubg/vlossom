import { store } from './store';
import * as vsPlugins from './plugins';

import type { App } from 'vue';
import type { VlossomOptions, VsComponent } from '@/declaration';
import type { ToastPlugin, ConfirmPlugin } from './plugins';

export class Vlossom {
    constructor(options?: VlossomOptions) {
        const { colorScheme = {}, styleSet = {}, theme = 'light' } = options || {};

        this.theme = (this.getDefaultTheme(options) as 'light' | 'dark') || theme;
        store.option.setGlobalColorScheme(colorScheme);
        store.option.registerStyleSet(styleSet);

        if (options?.detectOSTheme) {
            const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQueryList.addEventListener('change', (event) => {
                this.theme = event.matches ? 'dark' : 'light';
            });
        }
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
        return store.option.getState().theme;
    }

    set theme(value) {
        store.option.setTheme(value);

        localStorage.setItem('vlossom:theme', value);
        document.body.classList.toggle('vs-dark', value === 'dark');
    }

    get globalColorScheme() {
        return store.option.getState().globalColorScheme;
    }

    get styleSets() {
        return store.option.getState().styleSets;
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }

    public toast: ToastPlugin = vsPlugins.toastPlugin;

    public confirm: ConfirmPlugin = vsPlugins.confirmPlugin;
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
