<template>
  <v-sheet class="d-flex justify-center pa-4" rounded="lg">
    <div class="d-flex flex-column align-center text-center">
      <v-avatar
        class="mb-2"
        color="primary"
        size="large"
        :style="{ width: '80px', height: '80px' }"
      >
        <v-img
          cover
          v-if="!!profileStore?.profile?.userData?.image"
          :src="profileStore?.profile?.userData?.image"
        />
        <span v-else class="text-h3">{{ userInfo?.initials }}</span>
      </v-avatar>
      <h3 v-if="!!userInfo?.fullName">{{ userInfo?.fullName }}</h3>
      <p class="text-subtitle-1">{{ userInfo?.email }}</p>
    </div>
  </v-sheet>
</template>

<script setup>
import { computed } from 'vue';
import { useProfile } from '@/stores';
const profileStore = useProfile();

const userInfo = computed(() => {
  const { first_name, last_name, email } = profileStore.getUserInfo;
  return {
    initials: `${first_name?.[0]}${last_name?.[0]}`,
    fullName: `${first_name} ${last_name}`,
    email
  };
});
</script>
