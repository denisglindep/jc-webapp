<template>
  <v-layout class="h-screen">
    <NavBar />
    <v-main class="d-flex flex-column">
      <div class="bg-background d-flex flex-column flex-grow-1">
        <div class="flex-grow-1">
          <router-view />
        </div>
        <SubscribeToNewsSection />
        <Footer />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { useEvents } from '@/stores/events';
import { useTheme } from 'vuetify';
import { useMediaQuery } from '@vueuse/core';
import Footer from '@/components/common/Footer.vue';
import SubscribeToNewsSection from '@/components/screens/Home/SubscribeToNewsSection.vue';
import NavBar from '@/components/common/NavBar.vue';

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
