<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="primary">
          <span>{{ user.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
        </div>
      </v-card-text>
      <v-divider class="my-3" />
      <v-card-actions class="d-flex flex-column">
        <v-btn block variant="text" :rounded="false" color="inherit" to="/profile" class="ma-0">
          Profile
        </v-btn>
        <v-divider class="my-2" />
        <v-btn block variant="text" :rounded="false" color="inherit" class="ma-0">
          Logout
          <ConfirmModal
            title="Are you sure you want to log out of the platform?"
            @action-success="logUserOut"
          />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import ConfirmModal from './ConfirmModal.vue';

const router = useRouter();
const auth = useAuth();
const authStore = storeToRefs(auth);
const userData = authStore?.getUserInfo?.value?.data;
const { firstName, lastName, email } = userData;

const user = reactive({
  initials: `${firstName[0]}${lastName[0]}`,
  fullName: `${firstName} ${lastName}`,
  email
});

async function logUserOut() {
  try {
    await auth.logOutUser();
    auth.$reset();
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
