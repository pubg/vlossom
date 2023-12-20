import type { App } from 'vue';
import type { VlossomOptions, VsComponent } from '@/declaration/types';
import { Vlossom } from './vlossom';
import './styles/index.scss';

let vlossom: Vlossom;

function registerComponents(app: App<Element>, components: VsComponent[] = []) {
    const modules: Record<string, any> = import.meta.glob('./components/**/index.ts', { eager: true });
    Object.values(modules).forEach((module) => {
        const { name, component } = module.default;
        if (components.length && !components.includes(name as VsComponent)) {
            return;
        }
        app.component(name, component);
    });
}

function createVlossom(options?: VlossomOptions) {
    return {
        install(app: App<Element>) {
            vlossom = new Vlossom(options);

            app.config.globalProperties.$vlossom = vlossom;

            registerComponents(app, options?.components);
        },
    };
}

function getVlossom() {
    return vlossom;
}

export { createVlossom, getVlossom };
