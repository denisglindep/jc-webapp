<template>
  <div :style="{ maxWidth: '385px' }">
    <v-card min-height="200" class="py-6 px-4 bg-white">
      <div class="d-flex flex-column align-center">
        <LogoIcon />
        <v-card-title class="text-h4 text-center my-4">
          {{ ticket.level }}-{{ ticket.row }}-{{ ticket.seat_number }}
        </v-card-title>
      </div>
      <div class="d-flex flex-column flex-sm-row justify-space-between align-center">
        <div class="d-flex flex-column w-100">
          <div
            class="d-inline-flex justify-space-between align-center align-md-start d-md-flex align-md-center"
          >
            <span class="text-caption">{{ t('$vuetify.custom.texts.ticketNumber') }}: </span>
            <h3 class="ms-2 my-1 font-weight-medium">{{ ticket.ticket_number }}</h3>
          </div>
          <v-divider />
          <div
            class="d-inline-flex justify-space-between align-center align-md-start d-md-flex align-md-center"
          >
            <span class="text-caption">{{ t('$vuetify.custom.texts.status') }}: </span>
            <h3 class="ms-2 my-1 font-weight-medium">{{ ticket.status }}</h3>
          </div>
          <v-divider />
          <div
            class="d-inline-flex justify-space-between align-center align-md-start d-md-flex align-md-center"
          >
            <span class="text-caption">{{ t('$vuetify.custom.texts.price') }}: </span>
            <h3 class="ms-2 my-1 font-weight-medium">
              {{ filters.formatMoney(ticket.price, $vuetify.locale.current) }}
            </h3>
          </div>
          <v-divider />
        </div>
        <div class="w-auto d-flex flex-column justify-space-between w-75">
          <v-img :src="ticket.qr_image" min-width="150" />
        </div>
      </div>
      <v-card-actions>
        <v-btn size="x-large" block variant="flat" @click="downloadPDF">{{
          t('$vuetify.custom.btn.downloadPDF')
        }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-divider />
    <v-card class="py-6 px-4 bg-white">
      <h4 class="text-body-1 text-center">{{ eventName }}</h4>
    </v-card>
  </div>
</template>
<script setup>
import { useLocale } from 'vuetify';
import LogoIcon from '../../Icons/LogoIcon.vue';
const { t } = useLocale();

const props = defineProps({
  ticket: Object,
  eventName: String
});
const downloadPDF = () => {
  window.open(props.ticket.ticket_url, '_blank');
};
</script>
