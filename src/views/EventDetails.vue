<template>
  <div
    :style="{
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.7) 100%), url('${eventDetails?.cover_image}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <div class="backdrop-container">
      <v-container class="d-flex">
        <v-row justify="center" class="align-md-center">
          <v-col cols="12">
            <div
              v-if="loading"
              class="d-flex w-100 justify-center align-center fill-height h-screen"
            >
              <v-progress-circular />
            </div>
            <div v-else class="d-flex flex-column-reverse flex-md-row">
              <v-card elevation="0" class="bg-transparent text-white w-100 w-md-50">
                <v-card-title>
                  <h3>{{ eventDetails?.name_en }}</h3>
                </v-card-title>
                <v-card-text>
                  <p class="text-body-1">{{ eventDetails?.short_description_en }}</p>
                </v-card-text>

                <v-card-item>
                  <v-list class="bg-transparent">
                    <v-list-item class="pa-0">
                      <template v-slot:prepend>
                        <v-icon class="date-icon" size="x-large" icon="mdi-calendar-month" />
                      </template>
                      <v-list-item-title>{{ dates?.date }}</v-list-item-title>
                      <v-list-item-subtitle>{{ dates?.times }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                    <v-list-item class="pa-0">
                      <template v-slot:prepend>
                        <v-icon class="date-icon" size="x-large" icon="mdi-map-marker-outline" />
                      </template>
                      <v-list-item-title>Avenue</v-list-item-title>
                      <v-list-item-subtitle>{{
                        eventDetails?.venue?.name_en
                      }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                    <v-list-item class="pa-0">
                      <template v-slot:prepend>
                        <v-icon class="date-icon" size="x-large" icon="mdi-tag-outline" />
                      </template>
                      <v-list-item-title>Price</v-list-item-title>
                      <v-list-item-subtitle
                        >Startin from {{ eventDetails?.ga_price }}</v-list-item-subtitle
                      >
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                  </v-list>
                </v-card-item>
              </v-card>
              <v-card class="fill-height w-100 w-md-50">
                <v-img :src="eventDetails?.cover_image" height="100%" cover />
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEvents } from '@/stores/events.js';
import { computed } from 'vue';

const router = useRoute();
const eventsStore = useEvents();
const { eventDetails, loading } = storeToRefs(eventsStore);

const dates = computed(() => eventDetails?.value?.date_list?.[0]);

onMounted(() => {
  eventsStore.getEventDetails(router.params.id);
});
</script>

<style scoped>
.section-container {
  height: 65vh;
}

.backdrop-container {
  display: flex;
  justify-content: center;
  height: 100%;
  backdrop-filter: blur(20px);
}

.date-icon.v-icon {
  margin-inline-end: 1rem;
}
</style>
