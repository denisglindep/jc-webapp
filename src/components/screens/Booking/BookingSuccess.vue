<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" align="center">
        <v-card class="fill-height">
          <v-card-title class="text-h5 text-center">
            {{ t('$vuetify.custom.texts.thankYou') }}
          </v-card-title>
          <v-card-text class="text-center">
            <h2 class="text-body-2">
              {{ t('$vuetify.custom.texts.yourBookingHasBeenConfirmed') }}
            </h2>
          </v-card-text>
          <v-icon size="75" color="success" icon="mdi-check-circle" />
          <v-card-item class="w-auto text-center">
            <v-table>
              <tbody>
                <tr>
                  <td>{{ t('$vuetify.custom.common.amount') }}</td>
                  <td>{{ filters.formatMoney(route?.query?.trans_amount) }}</td>
                </tr>
                <tr>
                  <td>{{ t('$vuetify.custom.common.paymentMethod') }}</td>
                  <td>{{ route?.query?.['payment-method'] }}</td>
                </tr>
                <tr>
                  <td>{{ t('$vuetify.custom.common.reference_no') }}</td>
                  <td>{{ route.query?.ref_no }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-item>
          <v-card-item>
            <v-card-subtitle>
              {{ t('$vuetify.custom.texts.detailtshaveBeenSentToYourEmail') }} :
              <span class="font-weight-bold">{{
                profile.profile.userData.email
              }}</span></v-card-subtitle
            >
          </v-card-item>
          <v-card-actions class="justify-center">
            <v-btn
              :to="{
                path: '/my-bookings',
                query: {
                  bookingsType: 'upcoming'
                }
              }"
              color="primary"
              large
              >{{ t('$vuetify.custom.btn.goToMyBookings') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted } from 'vue';
import { useLocale } from 'vuetify';
import { useRoute } from 'vue-router';
import { useProfile } from '../../../stores';

const { t } = useLocale();
const profile = useProfile();
const route = useRoute();
defineProps({
  id: {
    type: String,
    required: true
  }
});

onMounted(() => {
  sessionStorage.removeItem('seatsio');
});
</script>
<style scoped>
.custom-height {
  height: calc(50vh);
}
</style>
