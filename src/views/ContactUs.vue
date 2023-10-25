<template>
  <v-container>
    <h4 class="text-center text-h4 font-weight-bold mb-4">Contact Us</h4>
    <v-row justify="center" align="center">
      <v-col xs="12" lg="4">
        <ContactUsForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ContactUsForm from '@/components/screens/ContactUs/ContactUsForm.vue';
</script>
