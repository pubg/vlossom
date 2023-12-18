import type { App } from 'vue';
import VsPage from './VsPage.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-page', VsPage);
    },
};
export * from './VsPage.vue';
