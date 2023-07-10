<template>
  <section>
    <div class="d-flex flex-column flex-md-row justify-space-between">
      <h3>{{ sectionTitle }}</h3>
      <div>
        <a href="#">See all</a>
      </div>
    </div>
    <v-container tag="article" class="px-0">
      <v-row>
        <v-col v-for="event in events" :key="event.id" cols="12" sm="12" lg="4">
          <EventsListCard :event="event" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import EventsListCard from '@/components/screens/Home/EventsListCard.vue';

defineProps({
  events: {
    type: Array,
    required: false
  },
  sectionTitle: {
    type: String,
    required: true
  }
});
</script>
