<template>
  <v-card height="100%" class="d-flex flex-column pa-6 custom-event-card-styles" :rounded="false">
    <v-img :src="event.cover_image" cover max-height="250" class="custom-event-card-image-styles" />
    <v-card-item class="my-4 py-0">
      <v-card-title class="text-bold py-0"> {{ event[`name_${currentLang}`] }}</v-card-title>
    </v-card-item>
    <v-card-text class="text-grey mb-4 py-0">
      {{ truncatedDescription }}
    </v-card-text>
    <v-card-item>
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-calendar-month-outline" color="grey" />
      </template>
      <v-card-subtitle v-if="event.date_time" class="pa-0">
        {{
          filters.formatDate(event.date_from, $vuetify.locale.current, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        }}
        -
        {{
          filters.formatDate(event.date_to, $vuetify.locale.current, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-actions class="ma-0 pa-0">
      <v-btn size="x-large" variant="elevated" @click="goToEvent(event.id)" block>{{
        t('$vuetify.custom.btn.viewEvent')
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from 'vuetify';
import { useRouter } from 'vue-router';

const { t, isRtl } = useLocale();
const router = useRouter();
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

const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));

const truncatedDescription = computed(() => {
  const maxLength = 200; // Set the maximum length for truncated description
  if (props.event[`short_description_${currentLang.value}`].length <= maxLength) {
    return props.event[`short_description_${currentLang.value}`];
  }
  return props.event[`short_description_${currentLang.value}`].slice(0, maxLength) + '...';
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
