<template>
  <v-container class="py-16">
    <h4 class="text-center text-h4 font-weight-bold">Contact Us</h4>
    <v-row justify="center" align="center" class="mt-10">
      <v-col xs="12" lg="4">
        <ContactUsForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ContactUsForm from '../components/screens/ContactUs/ContactUsForm.vue';
</script>
