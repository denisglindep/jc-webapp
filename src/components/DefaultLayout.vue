<template>
  <v-layout class="h-screen">
    <NavBar />
    <v-main class="d-flex flex-column">
      <section class="bg-background d-flex flex-column flex-grow-1">
        <router-view />
      </section>
      <SubscribeToNewsSection />
      <Footer />
    </v-main>
  </v-layout>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useTheme } from 'vuetify';
import { useMediaQuery } from '@vueuse/core';
import { useAuth, useEvents, useProfile } from '@/stores';
import Footer from '@/components/common/Footer.vue';
import SubscribeToNewsSection from '@/components/screens/Home/SubscribeToNewsSection.vue';
import NavBar from '@/components/common/NavBar.vue';

const events = useEvents();
const auth = useAuth();
const profile = useProfile();
const theme = useTheme();
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
const isDarkMode = ref(prefersDark);

// check if dark mode is enabled and change theme
watchEffect(() => {
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
});

onMounted(() => {
  const isLogged = auth?.user?.isAuthenticated;
  if (isLogged) {
    profile.getLoggedUserInfo();
  }
  events.getUpcomingEvents();
  events.getAllEventsByPage();
  events.getTodayEvents();
});
</script>
