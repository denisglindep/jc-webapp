<template>
  <v-container class="d-flex flex-column">
    <h4 class="text-center text-h4 font-weight-bold mb-8">Select Seats</h4>
    <div
      v-if="!selectedEventTimeInfo?.web_seatio_eventkey"
      class="d-flex w-100 justify-center align-center h-screen"
    >
      <v-progress-circular color="primary" indeterminate="" />
    </div>
    <div v-else class="flex-grow-1 custom-min-height">
      <v-row class="custom-height">
        <v-col cols="12" sm="12" md="8" :style="{ minHeight: '300px' }">
          <v-sheet class="h-100 rounded-lg">
            <SeatsioSeatingChart
              class="h-100"
              region="eu"
              workspaceKey="2800ed02-e2bf-4144-9647-efd0930081c7"
              session="continue"
              :event="selectedEventTimeInfo?.web_seatio_eventkey"
              :pricing="pricingInfo.price"
              :maxSelectedObjects="10"
              :minSelectedObjects="10"
              :priceFormatter="(price) => `${price} KWD`"
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
        <v-col class="flex-grow-1" cols="12" sm="12" md="4">
          <v-card elevation="0" class="d-flex flex-column" min-height="50%">
            <div class="flex-grow-1">
              <v-card-title class="text-center">Selected seats</v-card-title>

              <v-card-item>
                <v-table fixed-header density="comfortable" hover>
                  <thead>
                    <tr>
                      <th class="text-left"></th>
                      <th class="text-left">Category</th>
                      <th class="text-left">Price</th>
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
                              isDarkMode ? 'text-white' : 'text-primary'
                            }`"
                            >{{ item.labels.parent }}-{{ item.labels.own }}</span
                          >
                        </v-avatar>
                      </td>
                      <td>
                        <span class="ml-2">{{ item.category.label }}</span>
                      </td>
                      <td>{{ item?.pricing?.formattedPrice }}</td>
                      <td>
                        <v-icon icon="mdi-close" @click="() => deselectObject(item)" />
                      </td>
                    </tr>
                    <tr v-if="selectedObjects.length > 0" class="font-weight-medium">
                      <td colspan="2">Total:</td>
                      <td colspan="2">
                        <span> {{ totalPrice }} KWD </span>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-item>
            </div>
            <v-card-item>
              <v-btn
                class="my-2"
                size="large"
                block
                variant="tonal"
                :color="theme.global.name.value === 'dark' ? 'white' : 'primary'"
                :disabled="selectedObjects.length === 0"
                >Reset selected seats
                <ConfirmModal
                  title="Are you sure you want to reset selected seats?"
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
                >Continue</v-btn
              >
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
import { useTheme } from 'vuetify';
import { useEvents } from '@/stores';
import ConfirmModal from '@/components/common/ConfirmModal.vue';

const router = useRouter();
const theme = useTheme();
const route = useRoute();
const eventsStore = useEvents();
const seatingChart = ref(null);
const colorScheme = ref(theme.name.value);
const categoriesList = ref([]);
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
  categoriesList.value = await seatingChart.value.listCategories();
  selectedObjects.value = await seatingChart.value.listSelectedObjects();
}

async function handleHoldSucceeded() {
  resetSelection();
  await seatingChart.value.startNewSession();
}

async function handleObjectSelected(selectedObject) {
  console.log('selectedObject', selectedObject);
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
  eventsStore.setSelectedObjects(selectedObject);
  openedPanel.value = [];
}

function handleSeatAlreadyBooked(seatObj) {
  alreadySelectedSeats.value.push(seatObj);
  handleSeatAlreadySelected.value = true;
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
  localStorage.setItem('selectedSeats', JSON.stringify(selectedObjects.value));
  router.push({
    name: 'booking-summary',
    params: { id: route.params.id },
    query: { date_id: route.query.date_id }
  });
}

async function deselectObject({ id }) {
  await seatingChart.value.deselectObjects([{ id }]);
  selectedObjects.value = selectedObjects.value.filter((el) => el.id !== id);
  if (selectedObjects.value?.length === 0) {
    openedPanel.value = [0];
  }
}

async function resetSelection() {
  await seatingChart.value.clearSelection();
  selectedObjects.value = [];
}

const pricingInfo = computed(() => {
  const res = eventsStore.eventDetails.pricing.reduce(
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

const totalPrice = computed(() =>
  selectedObjects.value.reduce((acc, el) => acc + el.pricing.price, 0)
);

if (!eventsStore?.eventDetails?.data) {
  eventsStore.getEventDetails(route.params.id);
}
eventsStore.getSeatsPricing(route.query?.date_id);
</script>
<style scoped>
.custom-min-height {
  min-height: calc(100vh - 64px);
}
.custom-height {
  height: 85%;
}
</style>
