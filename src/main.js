import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import { aliases, md } from 'vuetify/iconsets/md';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './index.css';
// Vuetify
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App.vue';
import router from './router';
const app = createApp(App);

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#BE8686',
    surface: '#BE8686',
    primary: '#B00020',
    // 'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    // 'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
};

app.use(createPinia());
app.use(
  createVuetify({
    blueprint: md3,
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme
      }
    },
    icons: {
      defaultSet: 'md',
      aliases,
      sets: {
        md
      }
    },
    components,
    directives
  })
);
app.use(router);

app.mount('#app');
