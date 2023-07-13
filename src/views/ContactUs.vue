<template>
  <v-container class="my-4 my-md-8">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <h4 class="my-6 my-md-12 text-center text-h4 font-weight-bold">Contact Us</h4>
        <ContactUsForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ContactUsForm from '../components/screens/ContactUs/ContactUsForm.vue';
</script>
