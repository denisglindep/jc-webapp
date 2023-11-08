<template>
  <v-container>
    <h4 class="text-center text-h4 font-weight-bold mb-4">
      {{ t('$vuetify.custom.headings.contactUs') }}
    </h4>
    <v-row justify="center">
      <v-col xs="12" lg="4">
        <ContactUsForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLocale } from 'vuetify';
import ContactUsForm from '@/components/screens/ContactUs/ContactUsForm.vue';
const { t } = useLocale();
</script>
