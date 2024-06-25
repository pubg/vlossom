import { createVlossom } from 'vlossom';
import 'vlossom/styles';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(createVlossom());
});
