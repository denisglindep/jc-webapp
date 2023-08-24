<template>
  <v-card height="100%" class="d-flex flex-column pa-6 custom-event-card-styles" :rounded="false">
    <v-img :src="event.cover_image" cover max-height="250" class="custom-event-card-image-styles" />
    <v-card-item class="my-4 py-0">
      <v-card-title class="text-bold py-0"> {{ event.name_en }}</v-card-title>
    </v-card-item>
    <v-card-text class="text-grey mb-4 py-0">
      {{ truncatedDescription }}
    </v-card-text>
    <v-card-subtitle v-if="event.date_time" class="mb-4 py-0">
      <v-icon size="small" icon="mdi-calendar-month-outline" />
      {{ event.date_time }}
    </v-card-subtitle>
    <v-card-actions class="ma-0 pa-0">
      <v-btn size="x-large" variant="elevated" @click="goToEvent(event.id)" block>View Event</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
const router = useRouter();
const theme = useTheme();

console.log(theme?.computedThemes);
function goToEvent(id) {
  router.push({ name: 'event-details', params: { id } });
}

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
<style scoped>
.custom-event-card-styles {
  border-radius: 20px;
}
.custom-event-card-image-styles {
  border-radius: 0.5rem;
}
</style>
