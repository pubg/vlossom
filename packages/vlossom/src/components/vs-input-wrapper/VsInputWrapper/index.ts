import type { App } from 'vue';
import VsInputWrapper from './VsInputWrapper.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-input-wrapper', VsInputWrapper);
    },
};
export * from './VsInputWrapper.vue';
