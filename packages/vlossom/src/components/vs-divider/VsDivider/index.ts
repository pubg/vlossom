import type { App } from 'vue';
import VsDivider from './VsDivider.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-divider', VsDivider);
    },
};
export * from './VsDivider.vue';
