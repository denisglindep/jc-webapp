<template>
  <div class="h-full bg-slate-200 dark:bg-slate-900">
    <NavBar />
    <main>
      <router-view />
    </main>
    <SubscribeToNewsSection />
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './common/NavBar.vue';
import Footer from './common/Footer.vue';
import SubscribeToNewsSection from './screens/Home/SubscribeToNewsSection.vue';

import { useEvents } from '@/stores/events';
import { onMounted } from 'vue';

const events = useEvents();

onMounted(() => {
  events.getTodayEvents();
});
</script>
