<template>
  <v-layout class="h-screen">
    <NavBar />
    <v-main class="d-flex flex-column">
      <div class="bg-background">
        <router-view />
        <SubscribeToNewsSection />
        <Footer />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
import Footer from './common/Footer.vue';
import SubscribeToNewsSection from './screens/Home/SubscribeToNewsSection.vue';

import { useEvents } from '@/stores/events';
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useMediaQuery } from '@vueuse/core';
import { watchEffect } from 'vue';

const events = useEvents();
const theme = useTheme();
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
const isDarkMode = ref(prefersDark);

// check if dark mode is enabled and change theme
watchEffect(() => {
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
});

onMounted(() => {
  events.getUpcomingEvents();
  events.getAllEventsByPage();
  events.getTodayEvents();
});
</script>
