<template>
  <div v-if="loading" class="d-flex w-100 justify-center align-center h-screen">
    <v-progress-circular color="primary" indeterminate="" />
  </div>
  <div v-else class="d-flex flex-column">
    <div
      class="fill-height"
      :style="{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.7) 100%), url('${eventDetails?.data?.cover_image}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <div class="backdrop-container py-16">
        <v-container>
          <v-row class="d-flex flex-column-reverse flex-md-row">
            <v-col cols="12" sm="12" md="6" align-self="center">
              <v-card elevation="0" class="bg-transparent text-white">
                <v-card-title class="text-h4 text-wrap">{{
                  eventDetails?.data?.name_en
                }}</v-card-title>
                <v-card-text class="text-body-1">{{
                  eventDetails?.data?.short_description_en
                }}</v-card-text>
                <v-card-item class="pa-0">
                  <v-list class="bg-transparent">
                    <v-list-item class="date-icon" prepend-icon="mdi-calendar-month">
                      <v-row no-gutters v-if="!!eventStartDate">
                        <v-col cols="12" md="4" class="align-self-center">
                          <v-list-item-subtitle>Starts from:</v-list-item-subtitle>
                          <v-list-item-title>{{ eventStartDate }}</v-list-item-title>
                        </v-col>
                        <template v-if="eventDetails?.data?.is_sold_out">
                          <v-chip
                            class="ms-auto"
                            size="large"
                            color="primary"
                            variant="elevated"
                            rounded="lg"
                          >
                            Sold out
                          </v-chip>
                        </template>
                        <v-row v-else>
                          <v-col cols="12" xs="12" md="6">
                            <v-select
                              v-if="getEventDates?.length > 0"
                              :items="getEventDates"
                              @update:modelValue="setSelectedDate"
                              hide-details
                              label=" Choose date: "
                              class="text-truncate"
                              return-object
                            />
                            <v-chip
                              v-else
                              text="Booking is not available"
                              :rounded="true"
                              variant="tonal"
                              size="x-large"
                              class="text-white align-self-end"
                            />
                          </v-col>
                          <v-col cols="12" xs="12" md="6">
                            <v-select
                              :disabled="chosenTime?.length === 0"
                              clearable
                              :items="chosenTime"
                              item-title="time"
                              item-value="id"
                              hide-details
                              @update:modelValue="setSelectedTime"
                              return-object
                              label=" Choose time: "
                            >
                              <template v-slot:item="{ item, props }">
                                <v-list-item
                                  :disabled="item?.raw?.is_sold_out || !item.raw.isBookingOpen"
                                  v-bind="props"
                                >
                                  <template v-slot:title>
                                    <v-row align="center">
                                      <v-col cols="2">
                                        <p>{{ item.title }}</p>
                                      </v-col>
                                      <v-spacer />
                                      <v-col cols="10" align="end">
                                        <template v-if="!item.raw.isBookingOpen">
                                          <v-chip color="primary" small variant="elevated"
                                            >Booking opens on {{ item.raw.bookingOpenTime }}</v-chip
                                          >
                                        </template>
                                        <template v-else-if="item.raw.status">
                                          <v-chip
                                            :color="
                                              item.raw.status === 'Available'
                                                ? 'success'
                                                : item.raw.status === 'Sold Out'
                                                ? 'primary'
                                                : item.raw.status ===
                                                  'Limited Seats Available Hurry Up'
                                                ? 'warning'
                                                : 'primary'
                                            "
                                            variant="elevated"
                                            small
                                            >{{ item.raw.status }}</v-chip
                                          >
                                        </template>
                                      </v-col>
                                    </v-row>
                                  </template>
                                </v-list-item>
                              </template>
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-row>
                    </v-list-item>
                    <v-divider color="white" class="mb-2" />
                    <v-list-item prepend-icon="mdi-map-marker-outline">
                      <v-list-item-title>Avenue</v-list-item-title>
                      <v-list-item-subtitle>{{
                        eventDetails?.data?.venue?.name_en
                      }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                    <v-list-item prepend-icon="mdi-tag-outline">
                      <v-list-item-title>Price</v-list-item-title>
                      <v-list-item-subtitle
                        >Starts from: {{ selectedTimeObject?.ga_price }}</v-list-item-subtitle
                      >
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                  </v-list>
                </v-card-item>
                <v-card-actions>
                  <v-btn
                    :disabled="isBookingUnavailable"
                    block
                    size="x-large"
                    variant="elevated"
                    @click.once="handleBookEvent"
                  >
                    Book now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-img :src="eventDetails?.data?.cover_image" cover class="rounded-lg h-100" />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-container class="d-flex flex-column my-10" :style="{ gap: '3rem' }">
      <v-row>
        <v-col cols="12">
          <v-card class="bg-transparent" elevation="0">
            <v-card-title class="text-h3 mb-2">{{ eventDetails?.data?.name_en }}</v-card-title>
            <v-card-text>
              <div v-html="eventDetails?.data?.description_en" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="bg-transparent" elevation="0">
            <v-card-title class="text-h3 font-weight-medium mb-2"
              >Additional Information</v-card-title
            >
            <v-sheet
              rounded
              class="d-flex flex-column flex-md-row justify-space-between py-8 px-6 text-h6 text-lg-h5"
              :style="{ textOverflow: 'balanced' }"
            >
              <v-row>
                <v-col cols="6" class="additional_info_cell d-flex flex-column">
                  <span>Running Time:</span>
                  <span>Age:</span>
                </v-col>
                <v-col cols="6" class="d-flex flex-column font-weight-regular">
                  <span class="ml-4">{{ eventDetails?.data?.run_time }}</span>
                  <span class="ml-4">{{ eventDetails?.data?.age_limit }}</span>
                </v-col>
              </v-row>
              <v-spacer />
              <div class="d-flex">
                <div class="additional_info_cell d-flex flex-column">
                  <span>Dress Code:</span>
                  <span>Special Note:</span>
                </div>
                <div class="d-flex flex-column font-weight-regular">
                  <span class="ml-4">{{ eventDetails?.data?.dress_code }}</span>
                  <span class="ml-4">{{ eventDetails?.data?.special_note }}</span>
                </div>
              </div>
            </v-sheet>
          </v-card>
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
              eventType="suggested"
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
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import EventsListSection from '@/components/common/EventsListSection.vue';
import { useEvents } from '@/stores';

const router = useRouter();
const eventsStore = useEvents();
const { eventDetails, loading, getSuggestedEvents, getEventDates, getEventTime } =
  storeToRefs(eventsStore);

const selectedDateId = ref(null);
const selectedTimeObject = ref(null);
const chosenTime = ref([]);

const setSelectedTime = (timeObj) => {
  selectedTimeObject.value = timeObj;
};

const setSelectedDate = (dataObject) => {
  const selectedDateTimes = getEventTime?.value(dataObject.value);
  selectedDateId.value = dataObject.id;
  chosenTime.value = selectedDateTimes;
};

const isBookingUnavailable = computed(
  () =>
    eventDetails?.value?.data?.is_sold_out ||
    !selectedDateId?.value ||
    !selectedTimeObject?.value ||
    !selectedTimeObject?.value.isBookingOpen
);

const eventStartDate = computed(() => {
  const startDate = new Date(eventDetails?.value?.data?.date_from);
  const d = startDate?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return d;
});

const handleBookEvent = () => {
  router.push({
    name: 'select-seats',
    params: {
      id: router.currentRoute.value.params.id
    },
    query: {
      date_id: selectedDateId?.value
    }
  });
};

const suggestedEvents = getSuggestedEvents?.value(eventDetails?.value?.data?.genre?.id);

eventsStore.getEventDetails(router.currentRoute.value.params.id);
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

.custom-description p {
  color: red !important;
}

.additional_info_cell {
  min-width: 100px;
  font-weight: 500;
}
</style>
