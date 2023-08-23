<template>
  <ProfileAvatar :initials="user.initials" :full-name="user.fullName" :email="email" />
  <ProfileSettings />
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';

import ProfileAvatar from './ProfileAvatar.vue';
import ProfileSettings from './ProfileSettings.vue';

const auth = useAuth();
const authStore = storeToRefs(auth);
const userData = authStore?.getUserInfo?.value?.data;
const { firstName, lastName, email } = userData;

const user = computed(() => ({
  initials: `${firstName[0]}${lastName[0]}`,
  fullName: `${firstName} ${lastName}`
}));
</script>
