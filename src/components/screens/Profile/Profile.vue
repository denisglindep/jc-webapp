<template>
  <v-container class="py-16">
    <h4 class="text-h4 font-weight-bold">Profile</h4>
    <v-row class="mt-10">
      <v-col>
        <ProfileAvatar :initials="user.initials" :full-name="user.fullName" :email="email" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in settings" cols="12" sm="6" :key="index">
        <v-btn
          block
          size="large"
          class="bg-surface"
          variant="plain"
          color="inherit"
          rounded="lg"
          :prepend-icon="item.icon"
          :text="item.name"
          @click="$emit('selectedItem', item)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/stores';
import { storeToRefs } from 'pinia';

import ProfileAvatar from './ProfileAvatar.vue';

defineEmits(['selectedItem']);

const settings = ref([
  {
    id: 1,
    icon: 'mdi-bell-outline',
    title: 'Notifications',
    to: '/notifications',
    name: 'Notifications'
  },
  {
    id: 2,
    icon: 'mdi-comment-question-outline',
    title: 'Frequently Asked Questions',
    to: '/faq',
    name: 'FAQ'
  },
  {
    id: 3,
    icon: 'mdi-file-document-outline',
    title: 'Terms and conditions',
    to: '/terms-and-conditions',
    name: 'TermsAndConditions'
  },
  {
    id: 4,
    icon: 'mdi-credit-card-outline',
    title: 'Payment method',
    to: '/payment-method',
    name: 'PaymentMethod'
  }
]);

const auth = useAuth();
const authStore = storeToRefs(auth);
const userData = authStore?.getUserInfo?.value?.data;
const { firstName, lastName, email } = userData;

const user = computed(() => ({
  initials: `${firstName[0]}${lastName[0]}`,
  fullName: `${firstName} ${lastName}`
}));
</script>
