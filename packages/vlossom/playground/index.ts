import { createApp } from 'vue';
import { createVlossom } from '../src/main';
import App from './App.vue';

const app = createApp(App);
app.use(createVlossom());
app.mount('#app');
