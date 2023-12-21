<template>
  <v-container class="h-100">
    <v-row>
      <v-col>
        <v-btn
          class="mt-4"
          color="primary"
          variant="plain"
          :ripple="false"
          @click="backToEventDetails"
        >
          <template v-slot:prepend>
            <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
          </template>
          {{ t('$vuetify.custom.backBtns.backToEventDetails') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4 class="text-center text-h4 font-weight-bold mb-8">
          {{ t('$vuetify.custom.headings.selectSeats') }}
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div
          v-if="!selectedEventTimeInfo?.web_seatio_eventkey"
          class="d-flex w-100 justify-center align-center h-screen"
        >
          <v-progress-circular color="primary" indeterminate="" />
        </div>
        <v-row v-else>
          <v-col cols="12" md="8">
            <v-sheet class="h-100 rounded-lg" :style="{ minHeight: '500px' }">
              <SeatsioSeatingChart
                region="eu"
                workspaceKey="2800ed02-e2bf-4144-9647-efd0930081c7"
                session="continue"
                :language="$vuetify.locale.current"
                :event="selectedEventTimeInfo?.web_seatio_eventkey"
                :pricing="pricingInfo?.price"
                :maxSelectedObjects="10"
                :minSelectedObjects="10"
                :priceFormatter="(price) => filters.formatMoney(price, $vuetify.locale.current)"
                :showSeatLabels="true"
                :holdOnSelectForGAs="true"
                :showFullScreenButton="true"
                :colorScheme="colorScheme"
                :showSectionPricingOverlay="true"
                :showLegend="false"
                stylePreset="bubblegum"
                @fullScreenClosed="handleClosedFullscreen"
                @objectSelected="handleObjectSelected"
                @objectDeselected="deselectObject"
                @chartRendered="handleChartRendered"
                @selectedObjectBooked="handleSeatAlreadyBooked"
                @holdTokenExpired="handleHoldSucceeded"
                :categoryFilter="{
                  enabled: true,
                  multiSelect: true,
                  zoomOnSelect: true
                }"
              />
            </v-sheet>
          </v-col>
          <v-col cols="12" md="4">
            <v-card elevation="0">
              <v-card-title class="text-center">{{
                t('$vuetify.custom.texts.selectedSeats')
              }}</v-card-title>
              <v-card-item>
                <v-table fixed-header density="comfortable" hover>
                  <thead>
                    <tr>
                      <th class="text-left"></th>
                      <th class="text-left">{{ t('$vuetify.custom.texts.category') }}</th>
                      <th class="text-left">{{ t('$vuetify.custom.texts.price') }}</th>
                      <th class="text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in selectedObjects" :key="item.uuid">
                      <td>
                        <v-avatar
                          @click="() => handleCategorySelected(item)"
                          :color="item.category.color"
                        >
                          <span
                            :class="`text-caption font-weight-medium ${
                              isDarkMode ? 'text-white' : 'text-white'
                            }`"
                            >{{ item.labels.parent }}-{{ item.labels.own }}</span
                          >
                        </v-avatar>
                      </td>
                      <td>
                        <span class="ml-2">{{ item.category.label }}</span>
                      </td>
                      <td>
                        {{ filters.formatMoney(item?.pricing?.price, $vuetify.locale.current) }}
                      </td>
                      <td>
                        <v-icon icon="mdi-close" @click="() => deselectObject(item)" />
                      </td>
                    </tr>
                    <tr v-if="selectedObjects.length > 0" class="font-weight-medium">
                      <td colspan="2">{{ t('$vuetify.custom.texts.total') }}:</td>
                      <td colspan="2">
                        <span>
                          {{ filters.formatMoney(totalPrice, $vuetify.locale.current) }}
                        </span>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="4" class="text-center">
                        {{ t('$vuetify.custom.texts.noSeatsSelected') }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-item>
              <v-card-item>
                <v-btn
                  class="my-2"
                  size="large"
                  block
                  variant="tonal"
                  :color="theme.global.name.value === 'dark' ? 'white' : 'primary'"
                  :disabled="selectedObjects.length === 0"
                  >{{ t('$vuetify.custom.texts.resetSelectedSeats') }}
                  <ConfirmModal
                    :title="t('$vuetify.custom.texts.resetSelectedSeatsQuestion')"
                    @action-success="resetSelection"
                    :showDialog="true"
                /></v-btn>
                <v-btn
                  class="my-2"
                  size="large"
                  block
                  variant="flat"
                  :disabled="selectedObjects.length === 0"
                  @click="handleContinue"
                  >{{ t('$vuetify.custom.texts.continue') }}</v-btn
                >
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="handleSeatAlreadySelected">
      <v-card>
        <v-card-title class="text-h6"
          >{{ alreadySelectedSeats.length > 1 ? 'Seats' : 'Seat' }} already selected</v-card-title
        >
        <v-card-text>
          {{ alreadySelectedSeats.length > 1 ? 'Seats' : 'Seat' }} {{ ' ' }}
          {{ alreadySelectedSeats.map((el) => el?.labels?.displayedLabel).join(', ') }}
        </v-card-text>
        <v-card-text> Are selected by another user. Please select another seat </v-card-text>

        <v-card-actions>
          <v-btn color="primary" variant="tonal" block @click="handleSeatAlreadySelected = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SeatsioSeatingChart } from '@seatsio/seatsio-vue';
import { useLocale, useTheme } from 'vuetify';
import { useEvents } from '@/stores';
import ConfirmModal from '@/components/common/ConfirmModal.vue';

const router = useRouter();
const theme = useTheme();
const route = useRoute();
const { t, isRtl } = useLocale();
const eventsStore = useEvents();
const seatingChart = ref(null);
const colorScheme = ref(theme.name.value);
// const categoriesList = ref([]);
const selectedObjects = ref([]);
const openedPanel = ref([0]);
const handleSeatAlreadySelected = ref(false);
const alreadySelectedSeats = ref([]);
const apiHoldTokenInfo = ref(null);

const isDarkMode = computed(() => theme.current.value.dark);

async function handleCategorySelected(item) {
  await seatingChart.value.zoomToSection(item.labels.section);
}

async function handleClosedFullscreen() {
  await seatingChart.value.resetView();
}

async function handleChartRendered(chartObj) {
  seatingChart.value = chartObj;
  // categoriesList.value = await seatingChart.value.listCategories();
  // selectedObjects.value = await seatingChart.value.listSelectedObjects();
}

async function handleHoldSucceeded() {
  resetSelection();
  await seatingChart.value.startNewSession();
}

async function handleObjectSelected(selectedObject) {
  selectedObject.pulse();
  const token = JSON.parse(sessionStorage.getItem('seatsio')).holdToken;
  const holdTokenInfo = await eventsStore.setHoldToken(
    token,
    route.query?.date_id,
    selectedObject.chart.config.event
  );
  if (!apiHoldTokenInfo.value && holdTokenInfo?.id) {
    apiHoldTokenInfo.value = holdTokenInfo;
  }
  selectedObjects.value.push(selectedObject);
  eventsStore.setSelectedObjects(selectedObjects.value);
  openedPanel.value = [];
}

function handleSeatAlreadyBooked(seatObj) {
  alreadySelectedSeats.value.push(seatObj);
  handleSeatAlreadySelected.value = true;
}

async function backToEventDetails() {
  await resetSelection();
  router.push({
    name: 'event-details',
    params: { id: route.params.id }
  });
}

async function handleContinue() {
  const hold_token = JSON.parse(sessionStorage.getItem('seatsio')).holdToken;
  const auth = JSON.parse(localStorage.getItem('userobj'));
  const user_id = auth?.id;
  const seats = selectedObjects.value.map((el) => el.id + '-' + el.category.key);

  await eventsStore.setBookingSeats({
    event_id: route.params.id,
    date_time_id: route.query.date_id,
    seats,
    hold_token
  });

  await eventsStore.lockSelectedSeats({
    event_id: route.params.id,
    date_time_id: route.query.date_id,
    user_id,
    seats
  });

  // const seatAvaiability = await eventsStore.getSeatAvaiability(apiHoldTokenInfo.value?.id);
  localStorage.setItem(
    'selectedSeatsObj',
    JSON.stringify({
      selectedSeats: selectedObjects.value,
      eventId: route.params.id,
      dateId: route.query.date_id
    })
  );
  router.push({
    name: 'booking-summary',
    params: { id: route.params.id },
    query: { date_id: route.query.date_id }
  });
}

async function deselectObject({ id }) {
  await seatingChart.value.deselectObjects([{ id }]);
  eventsStore.setSelectedObjects([]);
  selectedObjects.value = selectedObjects.value.filter((el) => el.id !== id);
  if (selectedObjects.value?.length === 0) {
    openedPanel.value = [0];
  }
  localStorage.setItem(
    'selectedSeatsObj',
    JSON.stringify({
      selectedSeats: selectedObjects.value,
      eventId: route.params.id,
      dateId: route.query.date_id
    })
  );
}

async function resetSelection() {
  await seatingChart?.value?.clearSelection();
  selectedObjects.value = [];
  eventsStore.removeSelectedObjects();
  localStorage.setItem(
    'selectedSeatsObj',
    JSON.stringify({
      selectedSeats: selectedObjects.value,
      eventId: route.params.id,
      dateId: route.query.date_id
    })
  );
}

const pricingInfo = computed(() => {
  const res = eventsStore?.eventDetails?.pricing?.reduce(
    (acc, el) => {
      acc.maxSelectedObjects.push({ category: el.key, quantity: el.max_ticket });
      acc.minSelectedObjects.push({ category: el.key, quantity: el.min_ticket });
      acc.price.push({ category: el.key, price: +el.price });
      return acc;
    },
    { maxSelectedObjects: [], minSelectedObjects: [], price: [] }
  );
  return res;
});

const selectedEventTimeInfo = computed(() => {
  return eventsStore?.eventDetails?.data?.times?.find((el) => el.id == route.query?.date_id);
});

const totalPrice = computed(() => {
  return selectedObjects?.value?.reduce((acc, el) => acc + el?.pricing?.price, 0);
});

if (!eventsStore?.eventDetails?.data) {
  eventsStore.getEventDetails(route.params.id);
}
eventsStore.getSeatsPricing(route.query?.date_id);
</script>
<style scoped>
.custom-min-height {
  min-height: calc(100dvh - 75px);
}
</style>
