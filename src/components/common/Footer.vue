<template>
  <v-footer>
    <v-container>
      <v-row class="justify-center justify-sm-space-between" align="center">
        <v-col cols="auto">
          <LogoIcon />
        </v-col>
        <v-col cols="auto" class="d-none d-md-flex">
          <div :class="[isDarkMode ? 'text-white' : 'text-black']">
            <v-btn :ripple="false" to="/about" variant="plain" color="inherit" class="mx-2">{{
              t('$vuetify.custom.btn.aboutUs')
            }}</v-btn>
            <v-btn :ripple="false" to="/contact" variant="plain" color="inherit" class="mx-2">{{
              t('$vuetify.custom.btn.contactUs')
            }}</v-btn>
            <v-btn
              v-if="!isAuthenticated"
              :ripple="false"
              to="/signin"
              variant="plain"
              color="inherit"
              class="mx-2"
              >{{ t('$vuetify.custom.btn.signIn') }}</v-btn
            >
            <v-btn
              v-else
              :ripple="false"
              to="/profile"
              variant="plain"
              color="inherit"
              class="mx-2"
              >{{ t('$vuetify.custom.btn.profile') }}</v-btn
            >
            <v-btn
              v-if="!isAuthenticated"
              :ripple="false"
              to="/signup"
              variant="plain"
              color="inherit"
              class="mx-2"
              >{{ t('$vuetify.custom.btn.signUp') }}</v-btn
            >
          </div>
        </v-col>
        <v-col cols="auto">
          <div class="d-flex flex-column" style="gap: 0.5rem">
            <h5 class="font-bold">{{ t('$vuetify.custom.texts.culturalCenter') }}</h5>
            <div>
              <v-btn
                :ripple="false"
                density="compact"
                color="inherit"
                size="x-small"
                class="px-0"
                tag="a"
                :href="`https://www.google.com/maps?ll=29.360203,47.956159&z=16&t=m&hl=${
                  isRtl ? 'ar' : 'en'
                }-US&gl=US&mapclient=embed&daddr=Sheikh+Jaber+Al-Ahmed+Cultural+Center+Arabian+Gulf+St+Kuwait@29.3602031,47.9561591`"
                variant="text"
              >
                <template v-slot:prepend>
                  <v-icon size="16" icon="mdi-map-marker-outline" />
                </template>
                {{ t('$vuetify.custom.texts.address') }} -
                {{ t('$vuetify.custom.texts.getDirecitons') }}
              </v-btn>
            </div>
            <div class="d-flex justify-center justify-md-start">
              <v-btn
                class="mr-2"
                density="compact"
                color="inherit"
                size="small"
                icon="mdi-instagram"
                tag="a"
                href="https://www.instagram.com/jacc_kw/"
                variant="text"
              />
              <v-btn
                class="mx-2"
                density="compact"
                color="inherit"
                size="small"
                icon="mdi-facebook"
                tag="a"
                href="https://en-gb.facebook.com/SJACCkwt/"
                variant="text"
              />
              <v-btn
                class="mx-2"
                density="compact"
                color="inherit"
                size="small"
                icon="mdi-twitter"
                tag="a"
                href="https://twitter.com/jacc_kw"
                variant="text"
              />
              <v-btn
                class="mx-2"
                density="compact"
                color="inherit"
                size="small"
                icon="mdi-youtube"
                tag="a"
                href="https://www.youtube.com/channel/UCBkHihVGNn2th-47kUofPaQ"
                variant="text"
              />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-btn
            :disabled="current === 'ar'"
            variant="text"
            :ripple="false"
            @click="() => handleLanguageChange('ar')"
            >Arabic</v-btn
          >
          <span>|</span>
          <v-btn
            :disabled="current === 'en'"
            variant="text"
            :ripple="false"
            @click="() => handleLanguageChange('en')"
            >English</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" no-gutters>
          <div
            class="d-flex flex-column flex-md-row align-center justify-center justify-md-space-between text-center text-md-start"
          >
            <h5 class="font-bold">{{ t('$vuetify.custom.texts.termsAndConditions') }}</h5>
            <h5>
              {{ t('$vuetify.custom.texts.culturalCenter') }}. © {{ currentYear }}
              {{ t('$vuetify.custom.texts.allRightsReserved') }}
            </h5>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme, useLocale } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useAuth, useProfile } from '@/stores';
import LogoIcon from '../Icons/LogoIcon.vue';
const theme = useTheme();
const auth = useAuth();
const profileStore = useProfile();
const { t, isRtl, current } = useLocale();
const authState = storeToRefs(auth);
const isDarkMode = computed(() => theme.current.value.dark);
const currentYear = computed(() => new Date().getFullYear());

const isAuthenticated = computed(() => authState?.user?.value?.isAuthenticated);

function handleLanguageChange(locale) {
  current.value = locale;
  profileStore.changeLanguage(locale);
}
</script>

<style scoped>
.line-before {
  position: relative;
}

.line-before::before {
  content: '';
  position: absolute;
  bottom: 120%;
  transform: translateY(50%);
  height: 1px;
  width: 100%;
  background-color: red;
}
</style>
