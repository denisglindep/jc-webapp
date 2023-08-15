import 'vuetify/styles';
import './index.css';
import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { md3 } from 'vuetify/blueprints';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import colors from 'vuetify/lib/util/colors';

import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

import App from './App.vue';
import router from './router';
const app = createApp(App);

app.use(createPinia());
app.use(
  createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            surface: '#CBD5E1',
            primary: '#8F0808',
            'on-primary': '#FFFC',
            accent: '#8F0808',
            background: '#E2E8F0',
            grey: colors.grey.darken1,
            deepgrey: '#475569'
          }
        },
        dark: {
          colors: {
            surface: '#1E293B',
            primary: '#8F0808',
            'on-primary': '#FFFC',
            accent: '#8F0808',
            background: '#0F172A',
            grey: colors.grey.lighten1,
            deepgrey: '#475569'
          }
        }
      }
    },
    blueprint: md3,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    components,
    directives
  })
);
app.use(router);

app.use(VueTelInput)

app.mount('#app');
