import type { App } from 'vue';
import VsMessage from './VsMessage.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-message', VsMessage);
    },
};
export * from './VsMessage.vue';
