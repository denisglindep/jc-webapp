<template>
  <v-row>
    <v-btn
      class="mt-4"
      color="primary"
      variant="text"
      :ripple="false"
      @click="backToSeatsSelection"
    >
      <v-icon icon="mdi-arrow-left" />
      <span>Back to seats selection</span>
    </v-btn>
  </v-row>

  <v-row justify="center">
    <v-col cols="8">
      <v-card class="w-100">
        <v-card-item>
          <h3 class="text-center text-h5 my-2">{{ eventsStore?.eventDetails?.data?.name_en }}</h3>
          <v-img :src="eventsStore?.eventDetails?.data?.banner_image" class="rounded-lg" />
        </v-card-item>

        <v-card-item>
          <v-card-title>Your selection:</v-card-title>
          <v-expansion-panels v-model="openedPanel">
            <v-expansion-panel elevation="0" variant="accordion" value="true" title="General Info">
              <v-expansion-panel-text>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-theater" />
                    Place:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ eventsStore?.eventDetails?.data?.venue?.name_en }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar-range" />
                    Date:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.startDate }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-clock-time-eleven-outline" />
                    Start time:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.startTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-ticket-outline" />
                    Tickets:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedSeats?.length }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-cash" />
                    Total :
                  </v-col>
                  <v-col class="text-end">
                    <span class="font-weight-medium">{{ filters.formatMoney(totalPrice, $vuetify.locale.current) }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel elevation="0" variant="accordion" title="Additional Info">
              <v-expansion-panel-text>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-human-male-female" />
                    Age Limit:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ eventsStore?.eventDetails?.data?.age_limit }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-door-open" />
                    Door opening time :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.doorOpenTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-door-closed" />
                    Door closing time :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.doorCloseTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-hanger" />
                    Dress Code:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ eventsStore?.eventDetails?.data?.dress_code }}</span>
                    <v-icon
                      @click.prevent="isDressCodeDialogOpen = true"
                      tag="button"
                      icon="mdi-information-outline"
                      class="ms-1"
                    />
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-content-paste" />
                    Terms & Conditions:
                  </v-col>
                  <v-col class="text-end">
                    <v-icon
                      @click.prevent="isTermsDialogOpen = true"
                      tag="button"
                      icon="mdi-information-outline"
                      class="ms-1"
                    />
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-timer-sand" />
                    Duration:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ eventsStore?.eventDetails?.data?.run_time }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-item>

        <v-card-item>
          <v-checkbox-btn
            label="I agree to the dress code regulations for this show"
            v-model="dressCodeAccepted"
            @update:model-value="handleDressCodeCheckbox"
          />
          <v-checkbox-btn
            label="I agree to the terms & conditions"
            v-model="termsAccepted"
            @update:model-value="handleTermsCheckbox"
          />
          <v-checkbox-btn
            v-model="finalAccepted"
            label="I agree that this purchase is FINAL and cannot be refunded under any circumstances!"
          />
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>Select payment method:</v-card-title>
        <v-card-item>
          <v-radio-group v-model="selectedPaymentMethod">
            <v-radio label="KNET" value="KNET" />
            <v-radio label="Credit Card" value="CARD" />
          </v-radio-group>
        </v-card-item>
        <v-card-actions>
          <v-btn
            variant="flat"
            :disabled="!canPurchase"
            color="primary"
            block
            @click.once="handlePurchase"
            :loading="isLoading"
            >Purchase</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="isDressCodeDialogOpen" width="75%">
    <v-card v-click-outside="handleDressCodeOutside">
      <v-card-title class="text-center">{{
        eventsStore?.eventDetails?.data?.attireInfo?.data?.attire_en
      }}</v-card-title>
      <v-card-subtitle class="text-center">{{
        eventsStore?.eventDetails?.data?.attireInfo?.data?.prompt_en
      }}</v-card-subtitle>

      <v-card-item>
        <div class="d-flex flex-wrap">
          <v-img
            v-for="n in attireImagesArr"
            :key="n"
            :src="`${eventsStore?.eventDetails?.data?.attireInfo?.data?.images_baseurl}${n}`"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="primary" indeterminate />
              </div>
            </template>
          </v-img>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn
          v-if="dressCodeAccepted"
          variant="flat"
          color="primary"
          block
          @click="isDressCodeDialogOpen = false"
          >Agree</v-btn
        >
        <v-btn v-else variant="flat" color="primary" block @click="isDressCodeDialogOpen = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isTermsDialogOpen" width="75%">
    <v-card v-click-outside="handleTermsOutside">
      <v-card-title class="text-center">Terms & Conditions</v-card-title>
      <v-card-text>
        <div class="text-body-1" v-html="eventsStore?.eventDetails?.data?.term_condition_en" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="termsAccepted"
          variant="flat"
          color="primary"
          block
          @click="isTermsDialogOpen = false"
          >Agree</v-btn
        >
        <v-btn v-else variant="flat" color="primary" block @click="isTermsDialogOpen = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvents } from '@/stores';

const eventsStore = useEvents();
const route = useRoute();
const router = useRouter();
const openedPanel = ref([0]);
const isDressCodeDialogOpen = ref(false);
const isTermsDialogOpen = ref(false);
const dressCodeAccepted = ref(false);
const termsAccepted = ref(false);
const finalAccepted = ref(false);
const isLoading = ref(false);
const selectedPaymentMethod = ref(null);

const selectedSeats = eventsStore.getSelectedSeats;

function handleDressCodeCheckbox(val) {
  if (val) {
    isDressCodeDialogOpen.value = true;
  }
}

function handleTermsCheckbox(val) {
  if (val) {
    isTermsDialogOpen.value = true;
  }
}

function handleDressCodeOutside() {
  if (dressCodeAccepted.value) {
    dressCodeAccepted.value = false;
  }
  isDressCodeDialogOpen.value = false;
}

function handleTermsOutside() {
  if (termsAccepted.value) {
    termsAccepted.value = false;
  }
  isTermsDialogOpen.value = false;
}

function backToSeatsSelection() {
  router.push({
    name: 'select-seats',
    params: {
      id: route.params.id
    },
    query: {
      date_id: route.query.date_id
    }
  });
}

async function handlePurchase() {
  try {
    isLoading.value = true;
    const hold_token = JSON.parse(sessionStorage.getItem('seatsio')).holdToken;
    const payment = await eventsStore.callPayments({
      event_id: route.params.id,
      date_time_id: route.query.date_id,
      hold_token,
      gateway: selectedPaymentMethod.value,
      lang: 'en',
      voucher: '',
      seats: selectedSeats.map((el) => el.id + '-' + el.category.key).join(),
      platform: 'LOCALWEB'
    });
    window.open(payment.url, '_self');
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
}

const canPurchase = computed(() => {
  return (
    selectedSeats?.length > 0 &&
    dressCodeAccepted.value &&
    termsAccepted.value &&
    finalAccepted.value &&
    selectedPaymentMethod.value
  );
});

const totalPrice = computed(() => selectedSeats?.reduce((acc, el) => acc + el?.pricing?.price, 0));
const attireImagesArr = computed(() =>
  eventsStore.eventDetails?.data?.attireInfo?.data?.image_array?.split(',')
);
const selectedEventTimeInfo = computed(() => {
  const timeObj = eventsStore?.eventDetails?.data?.times?.find(
    (el) => el.id == route.query?.date_id
  );
  return {
    startDate: new Date(timeObj?.start_time).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    startTime: new Date(timeObj?.start_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    doorOpenTime: new Date(timeObj?.gate_opening_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    doorCloseTime: new Date(timeObj?.closed_at).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  };
});
</script>
<style scoped>
.info:hover {
  cursor: pointer;
}
</style>
