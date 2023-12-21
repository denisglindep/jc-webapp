<template>
  <section>
    <div class="d-flex align-center justify-space-between my-10">
      <h3 :class="titleStyles.classes" :style="titleStyles.styles">
        {{ sectionTitle }}
      </h3>
      <v-btn
        tag="a"
        variant="plain"
        :ripple="false"
        :to="{
          name: 'see-all',
          params: { eventType: eventType },
          ...(eventType === 'suggested' &&
            eventId && {
              query: { genreId: genreId, eventId: eventId }
            })
        }"
        >{{ t('$vuetify.custom.btn.seeAll') }}</v-btn
      >
    </div>
    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" md="6" lg="4">
        <EventsListCard :event="event" />
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { useLocale } from 'vuetify';
import EventsListCard from '@/components/common/EventsListCard.vue';
const { t } = useLocale();

defineProps({
  eventId: {
    type: String,
    required: false
  },
  genreId: {
    type: Number,
    required: false
  },
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
