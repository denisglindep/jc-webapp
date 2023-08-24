<template>
  <HeroSection />
  <v-container tag="section" class="my-10">
    <v-row>
      <v-col>
        <EventsListSection
          sectionTitle="Upcoming Events"
          :events="firstUpcomings"
          eventType="upcoming"
          :titleStyles="{ classes: 'text-h4 text-md-h3' }"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <EventsListSection
          sectionTitle="Coming Soon Events"
          :events="firstUpcomings"
          eventType="coming-soon"
          :titleStyles="{ classes: 'text-h4 text-md-h3' }"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ContactUsSection />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/common/EventsListSection.vue';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';

import { useEvents } from '@/stores';
const eventsStore = useEvents();
const { firstUpcomings } = storeToRefs(eventsStore);
</script>
