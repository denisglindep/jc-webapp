<template>
  <section>
    <v-container tag="article" class="px-0">
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between">
          <h3>{{ sectionTitle }}</h3>
          <div>
            <v-btn size="small" tag="a" variant="plain" :ripple="false" href="#">See all</v-btn>
          </div>
        </v-col>
        <v-row>
          <v-col v-for="event in events" :key="event.id" sm="12" lg="4">
            <EventsListCard :event="event" />
          </v-col>
        </v-row>
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
