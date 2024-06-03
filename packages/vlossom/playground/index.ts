import { createApp } from 'vue';
import { createVlossom } from './../src';
import Playground from './Playground.vue';

const app = createApp(Playground);

app.use(createVlossom());

app.mount('#app');
