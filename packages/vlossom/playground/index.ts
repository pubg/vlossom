import { createApp } from 'vue';
import { createVlossom } from '../src';
import '../src/components'; // for playground component typing
import Playground from './Playground.vue';

const app = createApp(Playground);

app.use(createVlossom());

app.mount('#app');
