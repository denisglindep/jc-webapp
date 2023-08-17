<template>
  <v-container class="my-4 my-md-8">
    <v-row class="flex-column">
      <v-col>
        <h4 class="my-6 my-md-12 text-h4 font-weight-bold">Profile</h4>
      </v-col>
      <v-col>
        <v-sheet class="d-flex justify-center pa-4" rounded="lg">
          <div class="d-flex flex-column align-center">
            <v-avatar
              class="mb-2"
              color="primary"
              size="large"
              :style="{ width: '80px', height: '80px' }"
            >
              <span class="text-h3">{{ user?.initials }}</span>
            </v-avatar>
            <h3>{{ user?.fullName }}</h3>
            <p class="text-subtitle-1">{{ user?.email }}</p>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-btn block class="pa-4 h-100 bg-surface" variant="plain" color="inherit" rounded="lg">
          <div class="d-flex align-center">
            <v-icon icon="mdi-bell-outline" class="mr-2" />
            <span>Norifications</span>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn block class="pa-4 h-100 bg-surface" variant="plain" color="inherit" rounded="lg">
          <div class="d-flex align-center">
            <v-icon icon="mdi-comment-question-outline" class="mr-2" />
            <span>FAQs</span>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn block class="pa-4 h-100 bg-surface" variant="plain" color="inherit" rounded="lg">
          <div class="d-flex align-center">
            <v-icon icon="mdi-file-document-outline" class="mr-2" />
            <span>Terms and conditions</span>
          </div>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn block class="pa-4 h-100 bg-surface" variant="plain" color="inherit" rounded="lg">
          <div class="d-flex align-center">
            <v-icon icon="mdi-credit-card-outline" class="mr-2" />
            <span>Payment method</span>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuth } from '../stores/auth';
import { storeToRefs } from 'pinia';

const auth = useAuth();
const authStore = storeToRefs(auth);
const userData = authStore?.getUserInfo?.value?.data;
const { firstName, lastName, email } = userData;

const user = reactive({
  initials: `${firstName[0]}${lastName[0]}`,
  fullName: `${firstName} ${lastName}`,
  email
});
</script>

<style scoped>
.profile_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;
}
</style>
