<template>
  <v-layout class="h-screen d-flex flex-column">
    <NavBar />
    <v-main class="flex-grow-1 bg-background">
      <Notification />
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
import Notification from '@/components/common/Notification.vue';

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
console.log(isLogged)
if (isLogged) {
  profile.getLoggedUserInfo();
}
</script>
<style lang=scss>
.notification {
 z-index: 1000;
 top: 64;
 right: 0;
 min-width: 250px;
 max-width: 25%;
}
</style>