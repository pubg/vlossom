import type { App } from 'vue';
import VsInput from './VsInput.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-input', VsInput);
    },
};
export * from './VsInput.vue';
