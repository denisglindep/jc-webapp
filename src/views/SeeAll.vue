<template>
  <v-container class="py-16">
    <v-row>
      <v-col>
        <div class="d-flex fill-height justify-center align-center">
          <h4
            v-if="!events.loading && eventsList.length === 0"
            class="text-center text-h4 font-weight-bold"
          >
            {{ t(`$vuetify.custom.headings.no${eventType}Events`) }}
          </h4>
          <h4
            v-else-if="!events.loading && eventsList.length > 0"
            class="text-center text-h4 font-weight-bold"
          >
            {{ t(`$vuetify.custom.headings.all${eventType}Events`) }}
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
import { ref, computed } from 'vue';
import { useLocale } from 'vuetify';
import { useRouter } from 'vue-router';
import { useEvents } from '@/stores';
import EventsListCard from '@/components/common/EventsListCard.vue';

const { t } = useLocale();

const router = useRouter();
const events = useEvents();


const eventType = computed(() => {
  let eventType = '';
  if (router.currentRoute.value?.params?.eventType === 'upcoming') {
    eventType = 'Upcoming';
  }
  if (router.currentRoute.value?.params?.eventType === 'suggested') {
    eventType = 'Suggested';
  }
  return eventType;
});

const eventsList = computed(() => {
  let list = [];
  if (eventType.value === 'Upcoming') {
    list = events.events.upcomings;
  }
  if (eventType.value === 'Suggested') {
    list = events.getSuggestedEvents(router.currentRoute.value?.query?.eventId);
  }
  return list;
});

if (router.currentRoute.value?.params?.eventType === 'upcoming') {
  events.getUpcomingEvents();
}
</script>
