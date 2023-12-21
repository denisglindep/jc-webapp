<template>
  <section class="section-container">
    <div
      v-if="events?.upcomings?.length === 0"
      class="d-flex fill-height justify-center align-center"
    >
      <v-progress-circular indeterminate color="primary" />
    </div>
    <HeroSection :events="events?.upcomings" v-else />
  </section>
  <v-container tag="section">
    <v-row>
      <v-col>
        <EventsListSection
          :sectionTitle="t('$vuetify.custom.headings.upcomingEvents')"
          :events="firstUpcomings"
          eventType="upcoming"
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
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useLocale } from 'vuetify';
import { useEvents } from '@/stores';

import HeroSection from '@/components/screens/Home/HeroSection.vue';
import EventsListSection from '@/components/common/EventsListSection.vue';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';

const eventsStore = useEvents();
const { t } = useLocale();
const { events } = storeToRefs(eventsStore);
const firstUpcomings = computed(() => events.value.upcomings.slice(0, 3));

eventsStore.getUpcomingEvents();
</script>

<style scoped>
.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 75px);
}
</style>
