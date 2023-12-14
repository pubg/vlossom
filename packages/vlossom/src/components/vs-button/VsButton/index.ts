import type { App } from 'vue';
import VsButton from './VsButton.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-button', VsButton);
    },
};
export * from './VsButton.vue';
