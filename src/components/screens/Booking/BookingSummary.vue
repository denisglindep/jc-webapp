<template>
  <v-row>
    <v-col cols="12">
      <v-card class="w-100" height="500">
        <v-card-item>
          <h3 class="text-center text-h6">{{ eventsStore?.eventDetails?.data?.name_en }}</h3>
          <v-img :src="eventsStore?.eventDetails?.data?.banner_image" class="rounded-lg" />
        </v-card-item>

        <v-card-item>
          <v-card-title>Your selection:</v-card-title>
          <v-expansion-panels v-model="openedPanel" multiple>
            <v-expansion-panel elevation="0" variant="accordion" value="true" title="General Info">
              <v-expansion-panel-text>
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-calendar-range" />
                    Date:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedDate }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-clock-time-eleven-outline" />
                    Time:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.time }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-ticket-outline" />
                    Tickets:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedObjects.length }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-cash" />
                    Total :
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ totalPrice }} - KWD</span>
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
                    Doors open:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ doorOpenTime }}</span>
                  </v-col>
                </v-row>
                <v-divider class="my-1" />
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-door-closed" />
                    Doors closed:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ doorClosedTime }}</span>
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
                <v-row>
                  <v-col>
                    <v-icon icon="mdi-pause-circle-outline" />
                    Intermission:
                  </v-col>
                  <v-col class="text-end">
                    <span>{{ selectedEventTimeInfo?.intermission }}</span>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEvents } from '@/stores';

const eventsStore = useEvents();
const route = useRoute();

const selectedEventTimeInfo = computed(() => {
  const timeObj = eventsStore?.eventDetails?.data?.times?.find((el) => el.id == route.query?.date_id);
  return {
    startTime: new Date(timeObj?.start_time).toLocaleDateString('en-US', { dateStyle: 'long' }),
    doorOpenTime: new Date(timeObj?.gate_opening_time).toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    doorCloseTime: new Date(timeObj?.closed_at).toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  };
});
</script>
