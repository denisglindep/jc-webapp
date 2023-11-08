<template>
  <!-- <v-card>
    <v-card-text>
      {{ locale.t('$vuetify.noDataText') }}
    </v-card-text>
  </v-card> -->
  <section>
    <div class="d-flex align-center justify-space-between my-10">
      <h3 :class="titleStyles.classes" :style="titleStyles.styles">
        {{ sectionTitle }}
      </h3>
      <v-btn tag="a" variant="plain" :ripple="false" :to="`/see-all${computedUrl}`">{{
        t('$vuetify.custom.btn.seeAll')
      }}</v-btn>
    </div>
    <v-row>
      <v-col v-for="event in events" :key="event.id" cols="12" md="6" lg="4">
        <EventsListCard :event="event" />
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from 'vuetify';
import EventsListCard from '@/components/common/EventsListCard.vue';
const { t } = useLocale();

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
