<template>
  <v-row>
    <v-btn
      class="mt-4"
      color="primary"
      variant="plain"
      :ripple="false"
      :disabled="isLoading"
      @click="backToSeatsSelection"
    >
      <template v-slot:prepend>
        <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
      </template>
      {{ t('$vuetify.custom.backBtns.backToSeatsSelection') }}
    </v-btn>
  </v-row>

  <v-row justify="center">
    <v-col cols="8">
      <v-card class="w-100">
        <v-card-item>
          <h3 class="text-center text-h5 my-2">
            {{ eventsStore?.eventDetails?.data?.[`name_${currentLang}`] }}
          </h3>
          <v-img
            :src="
              eventsStore?.eventDetails?.data?.[
                currentLang === 'en' ? 'banner_image' : 'banner_image_ab'
              ]
            "
            class="rounded-lg"
          />
        </v-card-item>

        <v-card-item>
          <v-card-title>{{ t('$vuetify.custom.texts.yourSelection') }}:</v-card-title>
          <v-expansion-panels v-model="openedPanel">
            <v-expansion-panel
              elevation="0"
              variant="accordion"
              value="true"
              :title="t('$vuetify.custom.common.generalInfo')"
            >
              <v-expansion-panel-text>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-theater" />
                    {{ t('$vuetify.custom.common.place') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{
                      eventsStore?.eventDetails?.data?.venue?.[`name_${currentLang}`]
                    }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar-range" />
                    {{ t('$vuetify.custom.common.date') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.startDate }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-clock-time-eleven-outline" />
                    {{ t('$vuetify.custom.common.startTime') }}:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.startTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-ticket-outline" />
                    {{ t('$vuetify.custom.common.tickets') }}:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedSeats?.length }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-cash" />
                    {{ t('$vuetify.custom.texts.total') }}:
                  </v-col>
                  <v-col class="text-end">
                    <span class="font-weight-medium">{{
                      useFormatMoney(totalPrice, $vuetify.locale.current)
                    }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel
              elevation="0"
              variant="accordion"
              :title="t('$vuetify.custom.common.additionalInfo')"
            >
              <v-expansion-panel-text>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-human-male-female" />
                    {{ t('$vuetify.custom.common.ageLimit') }}:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{
                      eventsStore?.eventDetails?.data?.[
                        currentLang === 'en' ? 'age_limit' : 'age_limit_ab'
                      ]
                    }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-door-open" />
                    {{ t('$vuetify.custom.common.doorOpeningTime') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.doorOpenTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-door-closed" />
                    {{ t('$vuetify.custom.common.doorClosingTime') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.doorCloseTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-hanger" />
                    {{ t('$vuetify.custom.common.dressCode') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{
                      eventsStore?.eventDetails?.data?.[
                        currentLang === 'en' ? 'dress_code' : 'dress_code_ab'
                      ]
                    }}</span>
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
                    {{ t('$vuetify.custom.texts.termsAndConditions') }} :
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
                    {{ t('$vuetify.custom.common.duration') }} :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{
                      eventsStore?.eventDetails?.data?.[
                        currentLang === 'en' ? 'run_time' : 'run_time_ar'
                      ]
                    }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-item>

        <v-card-item>
          <v-checkbox-btn
            :label="t('$vuetify.custom.texts.agreeToDressCode')"
            v-model="dressCodeAccepted"
            @update:model-value="handleDressCodeCheckbox"
          />
          <v-checkbox-btn
            :label="t('$vuetify.custom.texts.agreeToTermsAndConditions')"
            v-model="termsAccepted"
            @update:model-value="handleTermsCheckbox"
          />
          <v-checkbox-btn
            v-model="finalAccepted"
            :label="t('$vuetify.custom.texts.finalPurchaseAgree')"
          />
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>{{ t('$vuetify.custom.texts.selectPayment') }}</v-card-title>
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
            @click="handlePurchase"
            :loading="isLoading"
            >{{ t('$vuetify.custom.common.purchase') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="isDressCodeDialogOpen" width="75%">
    <v-card v-click-outside="handleDressCodeOutside">
      <v-card-title class="text-center">{{
        eventsStore?.eventDetails?.data?.attireInfo?.data?.[`attire_${currentLang}`]
      }}</v-card-title>
      <v-card-subtitle class="text-center">{{
        eventsStore?.eventDetails?.data?.attireInfo?.data?.[`prompt_${currentLang}`]
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
          >{{ t('$vuetify.custom.common.agree') }}</v-btn
        >
        <v-btn v-else variant="flat" color="primary" block @click="isDressCodeDialogOpen = false"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isTermsDialogOpen" width="75%">
    <v-card v-click-outside="handleTermsOutside">
      <v-card-title class="text-center">{{
        t('$vuetify.custom.texts.termsAndConditions')
      }}</v-card-title>
      <v-card-text>
        <div
          class="text-body-1"
          v-html="eventsStore?.eventDetails?.data?.[`term_condition_${currentLang}`]"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="termsAccepted"
          variant="flat"
          color="primary"
          block
          @click="isTermsDialogOpen = false"
          >{{ t('$vuetify.custom.common.agree') }}</v-btn
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
import { useLocale } from 'vuetify';
import { useRoute, useRouter } from 'vue-router';
import { useEvents, useNotifications } from '@/stores';
import { useFormatMoney, useFormatDate } from '@/composables';

const eventsStore = useEvents();
const notificationsStore = useNotifications();
const route = useRoute();
const router = useRouter();
const { t, isRtl, current } = useLocale();

const openedPanel = ref([0]);
const isDressCodeDialogOpen = ref(false);
const isTermsDialogOpen = ref(false);
const dressCodeAccepted = ref(false);
const termsAccepted = ref(false);
const finalAccepted = ref(false);
const isLoading = ref(false);
const selectedPaymentMethod = ref(null);

const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));

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
      lang: current.value,
      voucher: '',
      seats: selectedSeats.map((el) => el.id + '-' + el.category.key).join(),
      platform: 'LOCALWEB'
    });
    if (payment?.is_url) {
      window.open(payment?.url, '_self');
    }
  } catch (error) {
    console.log(error);
  } finally {
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
    startDate: useFormatDate(timeObj?.start_time, current.value, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    startTime: useFormatDate(timeObj?.start_time, current.value, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    doorOpenTime: useFormatDate(timeObj?.gate_opening_time, current.value, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    doorCloseTime: useFormatDate(timeObj?.closed_at, current.value, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  };
});

eventsStore.getAttireInfo(route.params.id);
</script>
<style scoped>
.info:hover {
  cursor: pointer;
}
</style>
