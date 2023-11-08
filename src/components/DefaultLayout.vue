<template>
  <v-layout class="h-screen d-flex flex-column">
    <NavBar />
    <v-main class="d-flex flex-column bg-background">
      <router-view />
    </v-main>
    <SubscribeToNewsSection />
    <Footer />
  </v-layout>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useTheme } from 'vuetify';
import { useMediaQuery } from '@vueuse/core';
import { useAuth, useProfile } from '@/stores';
import Footer from '@/components/common/Footer.vue';
import SubscribeToNewsSection from '@/components/screens/Home/SubscribeToNewsSection.vue';
import NavBar from '@/components/common/NavBar.vue';

const auth = useAuth();
const profile = useProfile();
const theme = useTheme();
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
const isDarkMode = ref(prefersDark);

// check if dark mode is enabled and change theme
watchEffect(() => {
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
});

const isLogged = auth?.user?.isAuthenticated;
if (isLogged) {
  profile.getLoggedUserInfo();
}
</script>
