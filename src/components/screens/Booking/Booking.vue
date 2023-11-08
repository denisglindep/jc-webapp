<template>
  <v-card class="fill-height bg-white">
    <div class="d-flex flex-column flex-xl-row h-100">
      <div class="flex-grow-1">
        <v-img class="h-100" :src="booking.event.cover_image" cover />
      </div>
      <div class="d-flex flex-column justify-space-between h-100">
        <v-card-item>
          <p class="text-h6">
            <span class="text-primary">{{ t('$vuetify.custom.texts.number') }}: </span>
            {{ booking.ticket_no }}
          </p>
          <p class="text-subtitle-1">
            <span class="text-primary">{{ t('$vuetify.custom.common.event') }}: </span>
            {{ booking.event[`name_${currentLang}`] }}
          </p>

          <p class="text-subtitle-1 font-weight-medium">
            <span class="text-primary">{{ t('$vuetify.custom.common.date') }}: </span>
            {{ filters.formatDate(booking.event_date_time.start_time, $vuetify.locale.current) }}
          </p>
          <p class="text-subtitle-1">
            <span class="text-primary">{{ t('$vuetify.custom.common.venue') }}: </span>
            {{ booking.event.venue[`name_${currentLang}`] }}
          </p>
          <p class="text-subtitle-1">
            <span class="text-primary">{{ t('$vuetify.custom.common.totalAmount') }}: </span>
            {{ filters.formatMoney(booking.total_price, $vuetify.locale.current) }}
          </p>
        </v-card-item>
        <!-- <v-divider />
        <v-card-item>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary"
                  >{{ t('$vuetify.custom.common.performanceTime') }}:
                </span>
                {{ booking.runtime }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary">{{ t('$vuetify.custom.common.doorsOpen') }}: </span>
                {{ booking.door_open }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary">{{ t('$vuetify.custom.common.intermission') }}: </span>
                {{ booking.event_date_time.intermission }}
              </p>
            </v-col>
          </v-row>
        </v-card-item> -->

        <v-card-actions class="justify-md-end">
          <v-btn
            size="x-large"
            block
            variant="elevated"
            :to="{
              name: 'booking-tickets',
              params: { id: booking.id, event_id: booking.event.id }
            }"
            >{{ t('$vuetify.custom.btn.showTickets') }} ({{ booking.number_of_tickets }})</v-btn
          >
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>
<script setup>
import { computed } from 'vue';
import { useLocale } from 'vuetify';
const { t, isRtl } = useLocale();
const currentLang = computed(() => (isRtl.value ? 'ab' : 'en'));

defineProps({
  booking: Object
});
</script>
