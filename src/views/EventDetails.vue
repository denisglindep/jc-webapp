<template>
  <div class="d-flex flex-column">
    <div
      class="fill-height"
      :style="{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.7) 100%), url('${eventDetails?.cover_image}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <div class="backdrop-container">
        <v-container class="d-flex">
          <v-row align="center">
            <v-col cols="12">
              <div
                v-if="loading"
                class="d-flex w-100 justify-center align-center fill-height h-screen"
              >
                <v-progress-circular />
              </div>
              <div v-else class="d-flex flex-column-reverse flex-md-row align-center">
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
                        <div class="d-flex flex-column flex-md-row">
                          <div class="flex-grow-1 mb-2 mb-md-0">
                            <v-list-item-title>{{ dates?.date }}</v-list-item-title>
                            <v-list-item-subtitle>{{ dates?.times }}</v-list-item-subtitle>
                          </div>
                          <v-select
                            v-if="times?.length > 0"
                            clearable
                            :items="times"
                            hide-details
                            @update:modelValue="setSelectedTime"
                            label=" Choose time: "
                          >
                            <template v-slot:selection="{ item }">
                              <span>{{ item.title }}</span>
                            </template>
                            <template v-slot:item="{ item, props }">
                              <v-list-item :disabled="item.raw.is_sold_out" v-bind="props">
                                <template v-slot:title>
                                  <v-row no-gutters align="center">
                                    <span color="red">{{ item.title }}</span>
                                    <template v-if="item.raw.is_sold_out">
                                      <v-spacer></v-spacer>
                                      <v-chip color="primary" small>Sold out</v-chip>
                                    </template>
                                  </v-row>
                                </template>
                              </v-list-item>
                            </template>
                          </v-select>
                          <v-chip
                            v-else
                            text="No available times"
                            :rounded="true"
                            variant="tonal"
                            size="x-large"
                            class="text-white"
                          />
                        </div>
                      </v-list-item>
                      <v-divider color="white" class="mb-2" />
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

                  <v-card-actions>
                    <v-btn :disabled="isBookingUnavailable" block size="x-large" variant="elevated">
                      Reserve
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-card class="w-100 w-md-50">
                  <v-img :src="eventDetails?.cover_image" height="100%" cover />
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-container class="d-flex flex-column my-10" :style="{ gap: '3rem' }">
      <v-row>
        <v-col>
          <div class="d-flex flex-column" :style="{ gap: '3rem' }">
            <h3 class="text-h3 font-weight-medium">{{ eventDetails?.name_en }}</h3>
            <div v-html="eventDetails?.description_en" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex flex-column" :style="{ gap: '3rem' }">
            <h3 class="text-h3 font-weight-medium">Additional Information</h3>
            <v-sheet
              rounded
              class="d-flex flex-column flex-md-row justify-space-between py-8 px-6 text-h6 text-lg-h5"
              :style="{ textOverflow: 'balanced' }"
            >
              <div class="d-flex">
                <div class="additional_info_cell d-flex flex-column">
                  <span>Running Time:</span>
                  <span>Age:</span>
                </div>
                <div class="d-flex flex-column font-weight-regular">
                  <span class="ml-4">{{ eventDetails?.run_time }}</span>
                  <span class="ml-4">{{ eventDetails?.age_limit }}</span>
                </div>
              </div>
              <v-spacer />
              <div class="d-flex">
                <div class="additional_info_cell d-flex flex-column">
                  <span>Dress Code:</span>
                  <span>Special Note:</span>
                </div>
                <div class="d-flex flex-column font-weight-regular">
                  <span class="ml-4">{{ eventDetails?.dress_code }}</span>
                  <span class="ml-4">{{ eventDetails?.special_note }}</span>
                </div>
              </div>
            </v-sheet>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="suggestedEvents?.length > 0">
        <v-col>
          <div class="d-flex flex-column" :style="{ gap: '3rem' }">
            <EventsListSection
              :titleStyles="{
                classes: 'text-h3 font-weight-medium',
                styles: {
                  marginBottom: '2rem'
                }
              }"
              sectionTitle="You may also like"
              :events="suggestedEvents"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import EventsListSection from '@/components/common/EventsListSection.vue';
import { useEvents } from '@/stores/events.js';

const selectedTimeId = ref(null);
const router = useRoute();
const eventsStore = useEvents();
const { eventDetails, loading, getSuggestedEvents } = storeToRefs(eventsStore);
const params = new URLSearchParams();

const setSelectedTime = (value) => {
  selectedTimeId.value = value;
  params.set('times_id', value);
};

const isBookingUnavailable = computed(() => {
  const res =
    !eventDetails?.value?.is_booking_open ||
    eventDetails?.value?.is_sold_out ||
    !selectedTimeId?.value ||
    isAnyTimeSoldOut?.value;

  return res;
});
const dates = computed(() => eventDetails?.value?.date_list?.[0]);
const times = computed(() =>
  eventDetails?.value?.event_date_times?.map((el) => {
    return {
      ...el,
      title: new Date(el.start_time).toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
      }),
      value: el.id
    };
  })
);
const isAnyTimeSoldOut = computed(() => {
  const timeObj = times?.value?.find((el) => el.id === selectedTimeId?.value);
  return timeObj?.is_sold_out;
});

const suggestedEvents = computed(() => getSuggestedEvents?.value(eventDetails?.value?.genre?.id));

eventsStore.getEventDetails(router.params.id);
</script>

<style scoped>
.section-container {
  height: 65dvh;
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

.custom-description p {
  color: red !important;
}

.additional_info_cell {
  min-width: 100px;
  font-weight: 500;
}
</style>
