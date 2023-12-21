<template>
  <v-container
    fluid
    :style="{
      height: 'calc(100dvh - 75px)',
      background: `linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), url('${BackgroundImage}'), lightgray 50% / cover no-repeat`,
      backgroundSize: 'cover'
    }"
  >
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="12" md="6" lg="4" xxl="2">
        <ForgotPasswordForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ForgotPasswordForm from '@/components/screens/ForgotPassword.vue/ForgotPasswordForm.vue';
import BackgroundImage from '../assets/images/auth_background.jpeg';
</script>
