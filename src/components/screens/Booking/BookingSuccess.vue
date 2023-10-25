<template>
  <v-container>
    <v-row class="h-100" align="center">
      <v-col cols="12" align="center">
        <v-card class="fill-height">
          <v-card-title class="text-h54 text-center"> Thank you! </v-card-title>
          <v-card-text class="text-center">
            <h2 class="text-body-1">Your booking is confirmed.</h2>
            <v-icon size="75" color="success" icon="mdi-check-circle" />
          </v-card-text>
          <v-card-item class="w-auto text-center">
            <v-table>
              <tbody>
                <tr v-for="(value, key) in additionalInfo" :key="key">
                  <td>{{ key }}</td>
                  <td>{{ value }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-item>
          <v-card-item>
            <v-card-subtitle>
              All details have been sent to
              <span class="font-weight-bold">{{ auth.user.data.email }}</span></v-card-subtitle
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
              >Go to My Bookings</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../../../stores';
const auth = useAuth();
const route = useRoute();

const additionalInfo = computed(() => ({
  Amount: `${route.query?.trans_amount} KWD`,
  ['Payment method']: route.query?.['payment-method'],
  Reference_no: route.query?.ref_no
}));

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
