<template>
  <div v-if="loading" class="d-flex w-100 justify-center align-center h-screen">
    <v-progress-circular color="primary" indeterminate="" />
  </div>
  <div v-else class="d-flex flex-column">
    <div
      class="fill-height"
      :style="{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.7) 100%), url('${
          eventDetails?.data?.[currentLang === 'en' ? 'cover_image' : 'cover_image_ab']
        }')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }"
    >
      <div class="backdrop-container" :class="!mobile ? 'custom-full-height' : ''">
        <v-container class="fill-height">
          <v-row>
            <v-col cols="12" md="6" lg="4" :class="mobile && 'order-last'" align-self="center">
              <v-card elevation="0" class="bg-transparent text-white">
                <v-card-title class="text-h4 text-wrap" :class="mobile && 'text-center'">{{
                  eventDetails?.data?.[`name_${currentLang}`]
                }}</v-card-title>

                <v-card-item class="pa-0">
                  <v-list class="bg-transparent">
                    <v-list-item class="date-icon" prepend-icon="mdi-calendar-month">
                      <v-row no-gutters v-if="!!eventStartDate">
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
                              :label="t('$vuetify.custom.inputTexts.chooseDate')"
                              class="text-truncate"
                              :item-title="[currentLang === 'en' ? 'date' : 'date_ar']"
                              return-object
                            />
                            <v-chip
                              v-else
                              :text="t('$vuetify.custom.texts.bookingIsNotAvailable')"
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
                              v-model="selectedTimeObject"
                              :item-title="`time_${currentLang}`"
                              item-value="id"
                              hide-details
                              @update:modelValue="setSelectedTime"
                              return-object
                              :label="t('$vuetify.custom.inputTexts.chooseTime')"
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
                                            >{{ t('$vuetify.custom.texts.bookingOpensOn') }}
                                            {{
                                              item.raw?.[`bookingOpenTime_${currentLang}`]
                                            }}</v-chip
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
                                            >{{
                                              item.raw[
                                                currentLang === 'en' ? 'status' : 'status_ab'
                                              ]
                                            }}</v-chip
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
                      <v-list-item-title>{{
                        t('$vuetify.custom.common.avenue')
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        eventDetails?.data?.venue?.[`name_${currentLang}`]
                      }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider color="white" class="my-2" />
                    <v-list-item prepend-icon="mdi-tag-outline">
                      <v-list-item-title>{{ t('$vuetify.custom.texts.price') }}</v-list-item-title>
                      <v-list-item-subtitle
                        >{{ t('$vuetify.custom.texts.startsFrom') }}:
                        {{
                          useFormatMoney(selectedTimeObject?.ga_price, $vuetify.locale.current)
                        }}</v-list-item-subtitle
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
                    {{ t('$vuetify.custom.btn.bookNow') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-img
                :src="eventDetails?.data?.[currentLang === 'en' ? 'cover_image' : 'cover_image_ab']"
                cover
                class="rounded-lg h-100"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-container class="my-12">
      <v-row justify="center">
        <v-col>
          <v-row>
            <v-col cols="12">
              <v-card class="bg-transparent" elevation="0">
                <v-card-title>
                  <h3 class="text-h3 mb-2">{{ eventDetails?.data?.[`name_${currentLang}`] }}</h3>
                </v-card-title>
                <v-card-text>
                  <div class="text-body-2">
                    <div v-html="eventDetails?.data?.[`description_${currentLang}`]" />
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card class="bg-transparent" elevation="0">
                <v-card-title class="text-h3 font-weight-medium mb-2">{{
                  t('$vuetify.custom.common.additionalInfo')
                }}</v-card-title>
                <v-sheet
                  class="d-flex flex-column flex-md-row justify-space-between py-8 px-6"
                  :style="{ textOverflow: 'balanced' }"
                >
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.runningTime') }}:
                        </v-col>
                        <v-col cols="6"
                          >{{
                            eventDetails?.data?.[currentLang === 'en' ? 'run_time' : 'run_time_ar']
                          }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.age') }}:
                        </v-col>
                        <v-col cols="6"
                          >{{
                            eventDetails?.data?.[
                              currentLang === 'en' ? 'age_limit' : 'age_limit_ab'
                            ]
                          }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.genre') }}:
                        </v-col>
                        <v-col cols="6"
                          >{{ eventDetails?.data?.genre?.[`name_${currentLang}`] }}
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-spacer />
                    <v-col cols="12" md="4">
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.intermission') }}:
                        </v-col>
                        <v-col cols="6">{{ eventDetails?.data?.intermission }} </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.dressCode') }}:
                        </v-col>
                        <v-col cols="6"
                          >{{
                            eventDetails?.data?.[
                              currentLang === 'en' ? 'dress_code' : 'dress_code_ab'
                            ]
                          }}
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="font-weight-medium">
                          {{ t('$vuetify.custom.common.specialNote') }}:
                        </v-col>
                        <v-col cols="6"
                          >{{
                            eventDetails?.data?.[
                              currentLang === 'en' ? 'special_note' : 'special_note_ab'
                            ]
                          }}
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useDisplay, useLocale } from 'vuetify';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEvents } from '@/stores';
import { useFormatMoney } from '@/composables';
import EventsListSection from '@/components/common/EventsListSection.vue';

const { mobile } = useDisplay();
const { t, isRtl } = useLocale();

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
  selectedTimeObject.value = null;
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

const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));

const suggestedEvents = getSuggestedEvents?.value(eventDetails?.value?.data?.genre?.id);

eventsStore.getEventDetails(router.currentRoute.value.params.id);
</script>

<style scoped>
.custom-full-height {
  height: calc(100dvh - 64px) !important;
}

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
