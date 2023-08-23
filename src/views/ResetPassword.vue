<template>
  <v-container
    fluid
    :style="{
      height: 'calc(100dvh - 64px)',
      background: `linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), url('${BackgroundImage}'), lightgray 50% / cover no-repeat`,
      backgroundSize: 'cover'
    }"
  >
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="12" md="6" lg="4" xxl="2">
        <ResetPasswordForm :userId="id" :email="email" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ResetPasswordForm from '@/components/screens/ResetPassword/ResetPasswordForm.vue';
import BackgroundImage from '../assets/images/auth_background.jpeg';

defineProps({
  email: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});
</script>
