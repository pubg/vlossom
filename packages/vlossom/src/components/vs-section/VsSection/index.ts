import type { App } from 'vue';
import VsSection from './VsSection.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-section', VsSection);
    },
};
export * from './VsSection.vue';
