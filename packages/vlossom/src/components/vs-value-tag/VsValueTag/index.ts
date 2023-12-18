import type { App } from 'vue';
import VsValueTag from './VsValueTag.vue';

export default {
    install(app: App<Element>) {
        app.component('vs-value-tag', VsValueTag);
    },
};
export * from './VsValueTag.vue';
