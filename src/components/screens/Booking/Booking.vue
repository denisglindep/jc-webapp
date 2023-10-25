<template>
  <v-card class="fill-height bg-white">
    <div class="d-flex flex-column flex-xl-row h-100">
      <div class="flex-grow-1">
        <v-img class="h-100" :src="booking.event.cover_image" cover />
      </div>
      <div class="d-flex flex-column justify-space-between h-100">
        <v-card-item>
          <p class="text-h6"><span class="text-primary">No.#: </span> {{ booking.ticket_no }}</p>
          <p class="text-subtitle-1">
            <span class="text-primary">Event: </span> {{ booking.event.name_en }}
          </p>
          <p class="text-subtitle-1 font-weight-medium">
            <span class="text-primary">Date: </span> {{ booking.timing_str }} -
            {{ booking.start_str }}
          </p>
          <p class="text-subtitle-1">
            <span class="text-primary">Venue: </span> {{ booking.event.venue.name_en }}
          </p>
          <p class="text-subtitle-1">
            <span class="text-primary">Total amount: </span> {{ booking.total_price }} KWD
          </p>
        </v-card-item>
        <v-divider />
        <v-card-item>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary">Performance Time: </span>
                {{ booking.runtime }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary">Doors Open: </span>
                {{ booking.door_open }}
              </p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <p class="text-subtitle-1">
                <span class="text-primary">Intermission: </span>
                {{ booking.event_date_time.intermission }}
              </p>
            </v-col>
          </v-row>
        </v-card-item>

        <v-card-actions class="justify-md-end">
          <v-btn
            size="x-large"
            block
            variant="elevated"
            :to="{
              name: 'booking-tickets',
              params: { id: booking.id, event_id: booking.event.id }
            }"
            >Show tickets ({{ booking.number_of_tickets }})</v-btn
          >
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>
<script setup>
defineProps({
  booking: Object
});
</script>
