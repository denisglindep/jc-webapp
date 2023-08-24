<template>
  <!-- <v-container tag="section" class="mb-5"> -->
  <section>
    <div class="d-flex align-center justify-space-between mb-10">
      <h3 :class="titleStyles.classes" :style="titleStyles.styles">
        {{ sectionTitle }}
      </h3>
      <v-btn tag="a" variant="plain" :ripple="false" :to="`/see-all${computedUrl}`">See all </v-btn>
    </div>
    <v-row>
      <v-col v-for="event in events" :key="event.id" xs="12" sm="12" md="6" lg="4">
        <EventsListCard :event="event" />
      </v-col>
    </v-row>
  </section>
  <!-- </v-container> -->
</template>

<script setup>
import { computed } from 'vue';
import EventsListCard from '@/components/common/EventsListCard.vue';

const computedUrl = computed(() => {
  let url = '/';
  if (props.eventType === 'suggested') {
    url = '/suggested';
  }
  if (props.eventType === 'upcoming') {
    url = '/upcoming';
  }
  if (props.eventType === 'coming-soon') {
    url = '/coming-soon';
  }
  return url;
});

const props = defineProps({
  events: {
    type: Array,
    required: false
  },
  sectionTitle: {
    type: String,
    required: true
  },
  titleStyles: {
    type: Object,
    required: false,
    default: () => ({
      styles: {},
      classes: 'font-weight-medium'
    })
  },
  eventType: {
    type: String,
    required: false,
    default: '/events'
  }
});
</script>
