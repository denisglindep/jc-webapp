import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
