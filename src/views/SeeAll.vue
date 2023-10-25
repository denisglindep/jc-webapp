<template>
  <v-container class="py-16">
    <v-row>
      <v-col>
        <div class="d-flex fill-height justify-center align-center">
          <h4
            v-if="!events.loading && eventsList.length === 0"
            class="text-center text-h4 font-weight-bold"
          >
            No {{ eventType }} events
          </h4>
          <h4
            v-else-if="!events.loading && eventsList.length > 0"
            class="text-center text-h4 font-weight-bold"
          >
            All {{ eventType }} events
          </h4>
        </div>
      </v-col>
    </v-row>
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
import { useRouter } from 'vue-router';
import { useEvents } from '@/stores';
import EventsListCard from '@/components/common/EventsListCard.vue';

const eventType = ref('');
const eventsList = ref([]);

const router = useRouter();
const events = useEvents();

onBeforeMount(async () => {
  if (router.currentRoute.value?.params?.eventType === 'coming-soon') {
    eventType.value = 'coming soon';
    eventsList.value = await events.getComingSoonEvents();
  }
  if (router.currentRoute.value?.params?.eventType === 'upcoming') {
    eventType.value = 'upcoming';
    eventsList.value = await events.getUpcomingEvents();
  }
});
</script>
