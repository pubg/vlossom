import { store } from './stores';
import { utils } from './utils';
import { modalPlugin, toastPlugin, confirmPlugin } from '@/plugins';

import type { App } from 'vue';
import type { VlossomOptions, VsComponent } from '@/declaration';
import type { ToastPlugin, ConfirmPlugin, ModalPlugin } from './plugins';

export class Vlossom {
    private darkThemeClass: string;

    constructor(options?: VlossomOptions) {
        const {
            colorScheme = {},
            styleSet = {},
            theme = 'light',
            darkThemeClass = '',
            detectOSTheme = false,
            radiusRatio = 1,
        } = options || {};

        this.darkThemeClass = darkThemeClass;
        this.theme = (this.getDefaultTheme(options) as 'light' | 'dark') || theme;

        store.option.setGlobalColorScheme(colorScheme);
        store.option.registerStyleSet(styleSet);
        if (utils.dom.isBrowser()) {
            this.theme = (this.getDefaultTheme(options) as 'light' | 'dark') || theme;
            store.option.setGlobalRadiusRatio(radiusRatio);
        }

        if (utils.dom.isBrowser() && detectOSTheme) {
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

    get store() {
        return store;
    }

    get theme() {
        return store.option.getOptions().theme;
    }

    set theme(value) {
        store.option.setTheme(value);

        localStorage.setItem('vlossom:theme', value);
        document.body.classList.toggle('vs-dark', value === 'dark');
        if (this.darkThemeClass) {
            document.body.classList.toggle(this.darkThemeClass, value === 'dark');
        }
    }

    get colorScheme() {
        return store.option.getOptions().globalColorScheme;
    }

    set colorScheme(colorScheme) {
        store.option.setGlobalColorScheme(colorScheme);
    }

    get styleSets() {
        return store.option.getOptions().styleSets;
    }

    get radiusRatio() {
        return store.option.getOptions().globalRadiusRatio;
    }

    set radiusRatio(radiusRatio: number) {
        store.option.setGlobalRadiusRatio(radiusRatio);
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }

    public toast: ToastPlugin = toastPlugin;

    public confirm: ConfirmPlugin = confirmPlugin;

    public modal: ModalPlugin = modalPlugin;
}

let _vlossom: Vlossom;
let _app: App;

function registerComponents(app: App, components: VsComponent[] = []) {
    const modules: Record<string, any> = import.meta.glob('./components/**/*.vue', { eager: true });
    Object.entries(modules).forEach(([path, module]) => {
        const component = module.default;
        if (components.length && !components.includes(component.name as VsComponent)) {
            return;
        }
        const componentName = component.name || (path.split('/').pop() || '').replace(/\.\w+$/, '');
        app.component(componentName, component);
    });
}

function createVlossom(options?: VlossomOptions): any {
    return {
        install(app: App) {
            _app = app;
            _vlossom = new Vlossom(options);

            app.config.globalProperties.$vs = _vlossom;

            registerComponents(app, options?.components);
        },
    };
}

function useVlossom() {
    return _vlossom;
}

function getApp() {
    return _app;
}

export { createVlossom, registerComponents, useVlossom, getApp };
