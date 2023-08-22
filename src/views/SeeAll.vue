<template>
  <v-container class="my-4 my-md-8">
    <h4 class="my-6 my-md-12 text-center text-h4 font-weight-bold">All {{ eventType }} events</h4>
    <div v-if="events.loading" class="d-flex fill-height justify-center align-center">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-row v-else>
      <v-col v-for="event in eventsList" :key="event.id" xs="12" sm="12" md="6" lg="4">
        <EventsListCard :event="event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useEvents } from '@/stores/events';
import { useRouter } from 'vue-router';

import EventsListCard from '@/components/common/EventsListCard.vue';
import { storeToRefs } from 'pinia';

const eventType = ref('');
const eventsList = ref([]);

const router = useRouter();
const events = useEvents();
const eventsStore = storeToRefs(events);

onBeforeMount(async () => {
  // if (router.currentRoute.value?.params?.eventType === 'suggested') {
  //   eventType.value = 'suggested';
  //   const params = new URLSearchParams();
  //   params.set('genre_id', eventsStore.eventDetails.value.genre.id);
  //   const res = await events.getAllEventsByPage(0);
  //   eventsList = res;
  //   eventsList.value?.push(...eventsList);
  // }
  if (router.currentRoute.value?.params?.eventType === 'coming-soon') {
    eventType.value = 'coming soon';
    await events.getComingSoonEvents();
    eventsList.value = eventsStore?.comingSoon?.value;
    // eventsList.value?.push(...res);
  }
  if (router.currentRoute.value?.params?.eventType === 'upcoming') {
    eventType.value = 'upcoming';
    await events.getUpcomingEvents();
    eventsList.value = eventsStore?.upcomings?.value;
    // eventsList.value?.push(...res);
  }
});
</script>
