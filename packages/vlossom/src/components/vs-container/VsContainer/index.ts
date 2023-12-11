import type { App } from 'vue';
import VsContainer from './VsContainer.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-container', VsContainer);
    },
};
export * from './VsContainer.vue';
