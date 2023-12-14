import type { App } from 'vue';
import VsWrapper from './VsWrapper.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-wrapper', VsWrapper);
    },
};
export * from './VsWrapper.vue';
