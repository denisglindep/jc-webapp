<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-card class="text-center">
          <v-card-title class="text-h5 text-center">{{
            t('$vuetify.custom.texts.paymentFailed')
          }}</v-card-title>
          <v-card-subtitle> {{ t('$vuetify.custom.texts.pleaseTryAgain') }} </v-card-subtitle>
          <v-icon size="75" color="error" icon="mdi-close-circle" />
          <v-card-item>
            <v-card-subtitle>
              {{ t('$vuetify.custom.texts.detailtshaveBeenSentToYourEmail') }} :
              <span class="font-weight-bold">{{
                profile.profile.userData.email
              }}</span></v-card-subtitle
            >
          </v-card-item>
          <v-card-actions class="justify-center">
            <v-btn to="/" color="primary" large>{{
              t('$vuetify.custom.backBtns.backToHome')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted } from 'vue';
import { useLocale } from 'vuetify';
import { useProfile, useEvents } from '../../../stores';

const { t } = useLocale();
const profile = useProfile();
const eventsStore = useEvents();

defineProps({
  id: {
    type: String,
    required: true
  }
});

onMounted(() => {
  eventsStore.unlockSelectedSeats();
  eventsStore.sessionStorage.removeItem('seatsio');
  sessionStorage.removeItem('selectedSeatsObj');
});
</script>
<style scoped>
.custom-height {
  height: calc(50vh);
}
</style>
