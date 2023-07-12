<template>
  <v-card height="100%" class="d-flex flex-column">
    <v-img :src="event.cover_image" cover max-height="250" class="align-end flex-grow-1" />
    <div class="d-flex flex-column justify-space-between flex-grow-1">
      <v-card-title class="text-bold"> {{ event.name_en }}</v-card-title>
      <v-card-text class="text-grey">{{ truncatedDescription }}</v-card-text>
      <v-card-subtitle>
        <v-icon size="small" icon="mdi-calendar-month-outline" />
        {{ event.date_time }}
      </v-card-subtitle>
    </div>
    <v-card-actions class="py-6">
      <v-btn size="x-large" variant="elevated" block>View Event</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isHovering: {
    type: Boolean
  }
});

const truncatedDescription = computed(() => {
  const maxLength = 200; // Set the maximum length for truncated description
  if (props.event.short_description_en.length <= maxLength) {
    return props.event.short_description_en;
  }
  return props.event.short_description_en.slice(0, maxLength) + '...';
});
</script>
