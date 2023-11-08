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
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { VDatePicker } from 'vuetify/labs/VDatePicker';
import colors from 'vuetify/lib/util/colors';

// Translations provided by Vuetify
import { en, ar } from 'vuetify/locale';
import { en as english, ar as arabic } from './i18n';

import App from './App.vue';
import router from './router';
const app = createApp(App);

const browserLocale = navigator.language.split('-')[0];
const currentLocale = localStorage.getItem('locale');
if (!currentLocale) {
  localStorage.setItem('locale', browserLocale);
}

app.config.globalProperties.filters = {
  formatMoney: (value, locale) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'KWD' }).format(value);
  },
  formatDate: (
    value,
    locale,
    options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }
  ) => {
    const date = new Date(value);
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
};
app.use(createPinia());
import { useProfile } from '@/stores';
const profileStore = useProfile();

app.use(
  createVuetify({
    locale: {
      locale: profileStore.profile.locale,
      fallback: 'en',
      messages: {
        en: {
          ...en,
          custom: {
            ...english
          }
        },
        ar: {
          ...ar,
          custom: {
            ...arabic
          }
        }
      }
    },
    defaults: {
      global: {
        VCard: {
          elevation: 4
        }
      }
    },
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
    components: {
      ...components,
      VSkeletonLoader,
      VDatePicker
    },
    directives
  })
);
app.use(router);
app.mount('#app');
