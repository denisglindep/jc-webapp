<template>
  <v-container class="py-16">
    <h4 class="text-center text-h4 font-weight-bold">All {{ eventType }} events</h4>
    <div v-if="events.loading" class="d-flex fill-height justify-center align-center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-row v-else class="mt-10">
      <v-col v-for="event in eventsList" :key="event.id" xs="12" sm="12" md="6" lg="4">
        <EventsListCard :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useEvents } from '@/stores';
import { useRouter } from 'vue-router';

import EventsListCard from '@/components/common/EventsListCard.vue';
import { storeToRefs } from 'pinia';

const eventType = ref('');
const eventsList = ref([]);

const router = useRouter();
const events = useEvents();
const eventsStore = storeToRefs(events);

onBeforeMount(async () => {
  if (router.currentRoute.value?.params?.eventType === 'coming-soon') {
    eventType.value = 'coming soon';
    await events.getComingSoonEvents();
    eventsList.value = eventsStore?.events?.comingSoon?.value;
  }
  if (router.currentRoute.value?.params?.eventType === 'upcoming') {
    eventType.value = 'upcoming';
    await events.getUpcomingEvents();
    eventsList.value = eventsStore?.events?.upcomings?.value;
  }
});
</script>
