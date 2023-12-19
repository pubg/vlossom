import type { App } from 'vue';
import VsForm from './VsForm.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-form', VsForm);
    },
};
export * from './VsForm.vue';
