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
          <v-divider class="my-3" />
          <v-btn rounded variant="text" color="inherit" :ripple="false" class="mx-4" to="/profile">
            Profile
          </v-btn>
          <v-divider class="my-3" />
          <v-btn
            rounded
            variant="text"
            color="inherit"
            :ripple="false"
            class="mx-4"
            @click="logUserOut"
          >
            Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';

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
    await authStore.logOutUser();
    authStore.$reset();
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
